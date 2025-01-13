import { model, Schema } from "mongoose";
import { IUser, UserModel } from "../types";
import bcrypt from "bcrypt";

const saltRounds = 10;

const userSchema = new Schema<IUser, UserModel>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: process.env.DEV_MODE ? 8 : 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email: string) {
        const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return re.test(email);
      },
      message: "Please fill a valid email",
    },
  },
  token: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});
export const User: UserModel = model<IUser, UserModel>("User", userSchema);
