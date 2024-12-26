import express from "express";
import { Plan } from "../models/Plan";

const plansRouter = express.Router();

plansRouter.get("/", async (_req, res, next) => {
  try {
    const plans = await Plan.find();
    res.json({ message: "ok", plans });
  } catch (e) {
    next(e);
  }
});

export default plansRouter;
