import { model, Schema } from "mongoose";
import {
  IMessage,
  IMessageUserData,
  MessageModel,
  MessageUserData,
} from "../types";

const messageUserDataSchema = new Schema<IMessageUserData, MessageUserData>({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const messageSchema = new Schema<IMessage, MessageModel>({
  message: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  userData: {
    type: messageUserDataSchema,
    required: true,
  },
});

export const Message: MessageModel = model<IMessage, MessageModel>(
  "Message",
  messageSchema,
);
