import { Router } from "express";
import { Review } from "../schemas/Review";

const reviewsRouter = Router();

reviewsRouter.get("/", async (_req, res, next) => {
  try {
    const reviews = await Review.find();

    const isEmpty = reviews.length === 0;

    if (isEmpty) {
      res.status(204).send({ message: "No reviews to load", reviews });
    }
    res.send({ message: "Reviews loaded", reviews });
  } catch (e) {
    next(e);
  }
});

export default reviewsRouter;
