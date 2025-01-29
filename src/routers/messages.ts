import { Router } from "express";
import { IMessage } from "../types";
import { Message } from "../schemas/Message";

const messagesRouter = Router();

messagesRouter.post("/", async (req, res, next) => {
  try {
    const message: IMessage = {
      message: req.body.message,
      userData: req.body.userData,
      subject: req.body.subject,
    };

    const newMessage = new Message(message);
    await newMessage.save();
    res.send({ message: "Message successfully created", newMessage });
  } catch (e) {
    next(e);
  }
});

export default messagesRouter;
