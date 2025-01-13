import express from "express";
import { IUserWithoutToken } from "../types";
import { User } from "../models/User";
import { MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";
import { imagesUpload } from "../../multer";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  imagesUpload.single("profilePicture"),
  async (req, res, next) => {
    try {
      const data: IUserWithoutToken = req.body;
      const userDataFromClient: IUserWithoutToken = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        profilePicture: req.file ? req.file.filename : null,
      };
      const newUser = new User(userDataFromClient);
      await newUser.save();
      res.json({ message: "User created successfully" });
    } catch (e) {
      if (e instanceof MongooseError) {
        res.status(422).send(e.message);
        return;
      }

      if (e instanceof MongoServerError) {
        res.send(e);
        return;
      }
      next(e);
    }
  },
);

export default usersRouter;
