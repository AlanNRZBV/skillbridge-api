import { model, Schema } from "mongoose";
import {
  ContentsItemModel,
  CourseModel,
  IContentsItem,
  ICourse,
  ILesson,
  LessonsModel,
} from "../types";
import { User } from "./User";

const lessonSchema = new Schema<ILesson, LessonsModel>({
  title: String,
  length: String,
  videoUrl: String,
});
const contentsItemSchema = new Schema<IContentsItem, ContentsItemModel>({
  lessons: {
    type: [lessonSchema],
    default: [],
  },
  title: String,
});

const courseSchema = new Schema<ICourse, CourseModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    contents: {
      type: [contentsItemSchema],
      default: [],
    },
    difficulty: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    author: {
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
    previewImages: {
      type: [String],
      required: true,
      default: [],
    },
    mainImg: {
      type: String,
      required: true,
    },
    mainVideo: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Course: CourseModel = model<ICourse, CourseModel>(
  "Course",
  courseSchema,
);
