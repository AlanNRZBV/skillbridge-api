import { Router } from "express";
import { Course } from "../schemas/Course";
import mongoose, { MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";

const coursesRouter = Router();

coursesRouter.get("/", async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate("author", "firstName lastName profilePicture")
      .orFail();

    res.send({ message: "Courses loaded", courses });
  } catch (e) {
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      res.status(404).send({ message: "Document not found", e });
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

coursesRouter.get("/:id", async (req, res, next) => {
  try {
    const id: string = req.params.id;

    const course = await Course.findById(id).orFail();

    res.send({ message: "Course loaded", course });
  } catch (e) {
    if (
      e instanceof mongoose.Error.ValidationError ||
      e instanceof mongoose.Error.CastError
    ) {
      res.status(400).send({ message: "Bad request", e });
      return;
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      res.status(404).send({ message: "Document not found", e });
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

export default coursesRouter;
