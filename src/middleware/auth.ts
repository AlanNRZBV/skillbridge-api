import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface UserAuth {
  email: string;
  role: string;
  _id: string;
}

export interface AuthRequest extends Request {
  user?: UserAuth;
}

interface Decoded {
  user: UserAuth;
  iat: number;
  exp: number;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.DEV_SECRET_ACCESS_TOKEN!,
    ) as Decoded;
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(403).json({ message: "Forbidden", e });
  }
};

export default auth;
