import { Router } from "express";
import { About } from "../schemas/About";
import mongoose, { MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";

const aboutRouter = Router();

aboutRouter.get("/", async (req, res, next) => {
  try {
    const aboutData = await About.findOne().orFail();
    res.send({ message: "About data loaded", aboutData });
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

export default aboutRouter;
