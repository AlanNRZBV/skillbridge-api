import { Model } from "mongoose";

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
declare interface IPlanFromDb extends IPlan {
  _id: string;
}

declare type PlanModel = Model<IPlan>;
