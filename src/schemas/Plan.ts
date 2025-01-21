import { model, Schema } from "mongoose";
import { IPlan, PlanModel } from "../types";

const featureInfoSchema = new Schema({
  value: { type: Boolean, required: true },
  title: { type: String, required: true },
});

const planSchema = new Schema<IPlan, PlanModel>(
  {
    type: {
      required: true,
      type: String,
      enum: ["free", "paid"],
    },
    name: {
      required: true,
      type: String,
    },
    perMonth: {
      required: true,
      type: Number,
    },
    perYear: {
      required: true,
      type: Number,
    },
    features: {
      type: Map,
      of: featureInfoSchema,
      required: true,
    },
  },
  { timestamps: true },
);

export const Plan: PlanModel = model<IPlan, PlanModel>("Plan", planSchema);
