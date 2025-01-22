import { Router } from "express";
import { Course } from "../schemas/Course";

const coursesRouter = Router();

coursesRouter.get("/", async (req, res, next) => {
  try {
    const courses = await Course.find();
    const isEmpty = courses.length === 0;

    if (isEmpty) {
      res.status(204).send({ message: "No courses to load", courses });
    }
    res.send({ message: "Courses loaded", courses });
  } catch (e) {
    next(e);
  }
});

export default coursesRouter;
