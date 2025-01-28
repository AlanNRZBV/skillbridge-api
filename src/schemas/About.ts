import {
  AboutCardModel,
  AboutModel,
  AboutSectionModel,
  IAbout,
  IAboutCard,
  IAboutSection,
} from "../types";
import { model, Schema } from "mongoose";

const cardSchema = new Schema<IAboutCard, AboutCardModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const sectionSchema = new Schema<IAboutSection, AboutSectionModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["achievement", "goal"],
  },
  cards: {
    type: [cardSchema],
    required: true,
    default: [],
  },
});

const aboutSchema = new Schema<IAbout, AboutModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  section: {
    type: [sectionSchema],
    required: true,
    default: [],
  },
});

export const About: AboutModel = model<IAbout, AboutModel>(
  "About",
  aboutSchema,
);
