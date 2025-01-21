import { model, Schema } from "mongoose";
import { IReview, ReviewModel } from "../types";
import { User } from "./User";
import { Course } from "./Course";

const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async (value: Schema.Types.ObjectId) => {
          const user = await User.findById(value);
          return Boolean(user);
        },
      },
    },
    content: {
      type: String,
      maxlength: 1000,
      required: true,
      minlength: 8,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      validate: {
        validator: async (value: Schema.Types.ObjectId) => {
          const course = await Course.findById(value);
          return Boolean(course);
        },
      },
    },
  },
  { timestamps: true },
);
export const Review: ReviewModel = model<IReview, ReviewModel>(
  "Review",
  reviewSchema,
);
