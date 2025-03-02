import express from "express";
import jwt from "jsonwebtoken";
import { IUserWithoutToken } from "../types";
import { User } from "../schemas/User";
import mongoose, { MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";
import { imagesUpload } from "../multer";
import bcrypt from "bcrypt";
import auth, { AuthRequest } from "../middleware/auth";
import { Request, Response, NextFunction } from "express";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  imagesUpload.single("profilePicture"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IUserWithoutToken = req.body;
      const userDataFromClient: IUserWithoutToken = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        profilePicture: req.file ? `assets/${req.file.filename}` : null,
      };
      const newUser = new User(userDataFromClient);
      await newUser.save();
      res.json({ message: `Hi, ${data.firstName} ${data.lastName}` });
    } catch (e) {
      if (e instanceof MongooseError) {
        res.status(422).send(e);
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
    const user = await User.findOne({ email: email }).orFail();

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
          },
        },
        process.env.DEV_SECRET_ACCESS_TOKEN!,
        { expiresIn: "1d" },
      );

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        domain:
          process.env.NODE_ENV === "production"
            ? "skillbridge-api-0m6e.onrender.com"
            : "",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
      });

      res
        .status(200)
        .json({ message: `Welcome back, ${user.firstName} ${user.lastName}` });
    }
  } catch (e) {
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      res.status(404).send({ message: "Email or Password is not correct", e });
      return;
    }
    if (e instanceof MongooseError) {
      res.status(500).send({ message: "Database error", e });
      return;
    }
    if (e instanceof MongoServerError) {
      res.status(503).send({ message: "Server error", e });
      return;
    }

    next(e);
  }
});

usersRouter.get("/current", auth, async (req: AuthRequest, res, next) => {
  try {
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      res.status(403).send({ message: "Access denied" });
      return;
    }

    res.status(200).send({ message: "User found", user: user });
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/logout", auth, async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      domain:
        process.env.NODE_ENV === "production"
          ? "skillbridge-api-0m6e.onrender.com"
          : "",
      path: "/",
    });
    res.status(200).send({ message: "Logged out successfully" });
  } catch (e) {
    next(e);
  }
});

usersRouter.get("/self/:id", auth, async (req: AuthRequest, res, next) => {
  try {
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      res.status(403).send({ message: "Access denied" });
      return;
    }
    res.status(200).send({ message: "User found", user: user });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
