import mongoose from "mongoose";
import { Plan } from "./src/models/Plan";
import dotenv from "dotenv";
dotenv.config();

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log("=>(fixtures.ts:11)", e);
    console.log(`Collection ${collectionName} was missing, skipped drop...`);
  }
};

const run = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    const db = mongoose.connection;

    const collections = ["plans"];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await Plan.create(
      {
        type: "free",
        perYear: 0,
        perMonth: 0,
        name: "Free",
        features: {
          courseAccess: {
            value: true,
            title: "Access to selected free courses.",
          },
          materialsAndResources: {
            value: true,
            title: "Limited course materials and resources.",
          },
          support: { value: true, title: "Basic community support." },
          certificate: {
            value: false,
            title: "No certification upon completion.",
          },
          adds: { value: true, title: "Ad-supported platform." },
          exclusiveForumAccess: {
            value: false,
            title: "Access to exclusive Pro Plan community forums.",
          },
          earlyAccess: {
            value: false,
            title: "Early access to new courses and updates.",
          },
        },
      },
      {
        type: "paid",
        perMonth: 79,
        perYear: 700,
        name: "Pro",
        features: {
          courseAccess: {
            value: true,
            title: "Unlimited access to all courses.",
          },
          materialsAndResources: {
            value: true,
            title: "Unlimited course materials and resources.",
          },
          support: { value: true, title: "Priority support from instructors." },
          certificate: {
            value: true,
            title: "Course completion certificates.",
          },
          adds: { value: true, title: "Ad-free experience." },
          exclusiveForumAccess: {
            value: true,
            title: "Access to exclusive Pro Plan community forums.",
          },
          earlyAccess: {
            value: true,
            title: "Early access to new courses and updates.",
          },
        },
      },
    );

    await db.close();
  } catch (e) {
    console.log("=>(fixtures.ts:21) e", e);
  }
};

void run();
