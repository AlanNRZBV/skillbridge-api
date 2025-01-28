import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as mongoose from "mongoose";
import path from "path";
import plansRouter from "./routers/plans";
import usersRouter from "./routers/users";
import cookieParser from "cookie-parser";
import reviewsRouter from "./routers/reviews";
import coursesRouter from "./routers/courses";
import aboutRouter from "./routers/about";

dotenv.config();

const app: Express = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/plans", plansRouter);
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/courses", coursesRouter);
app.use("/about", aboutRouter);

const run = async () => {
  await mongoose.connect(process.env.DATABASE_URL!);

  app.listen(process.env.PORT, () => {
    console.log(`skillbridge server started on ${process.env.PORT} port`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

void run();
