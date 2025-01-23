import { Model, Schema } from "mongoose";

declare type FeatureName =
  | "courseAccess"
  | "materialsAndResources"
  | "support"
  | "certificate"
  | "adds"
  | "exclusiveForumAccess"
  | "earlyAccess";

declare interface IFeatureInfo {
  value: boolean;
  title: string;
}

declare interface IPlan {
  type: "free" | "paid";
  name: string;
  perMonth: number;
  perYear: number;
  features: Record<FeatureName, IFeatureInfo>;
}

declare type PlanModel = Model<IPlan>;

declare interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string | null;
  role: "user" | "admin";
  token: string;
}

declare interface IUserWithoutToken extends Omit<IUser, "token", "role"> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string | null;
}

declare type UserModel = Model<IUser>;

declare interface IReview {
  authorId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  content: string;
}
declare type ReviewModel = Model<IReview>;

declare interface ILesson {
  title: string;
  length: string;
  videoUrl: string;
}

declare type LessonsModel = Model<ILesson>;

declare interface IContentsItem {
  title: string;
  lessons: ILesson[];
}

declare type ContentsItemModel = Model<IContentsItem>;

declare interface ICourse {
  title: string;
  description: string;
  availability: "free" | "paid";
  contents: IContentsItem[];
  difficulty: "beginner" | "intermediate" | "advanced";
  length: number;
  author: Schema.Types.ObjectId;
  previewImages: string[];
  mainImg: string;
}

declare type CourseModel = Model<ICourse>;
