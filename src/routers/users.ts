import express from "express";
import jwt from "jsonwebtoken";
import { IUserWithoutToken } from "../types";
import { User } from "../models/User";
import { MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";
import { imagesUpload } from "../../multer";
import bcrypt from "bcrypt";
import auth, { AuthRequest } from "../middleware/auth";

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

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "All fields are mandatory" });
    }
    const user = await User.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user: {
            email: user.email,
            role: user.role,
            _id: user._id,
          },
        },
        process.env.DEV_SECRET_ACCESS_TOKEN!,
        { expiresIn: "1m" },
      );

      res.cookie("accessToken", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 5000,
      });

      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).send({ message: "Email or password is not valid" });
    }
  } catch (e) {
    next(e);
  }
});

usersRouter.get("/test", auth, async (req: AuthRequest, res, next) => {
  try {
    res.status(200).send({ message: "test", user: req.user });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
