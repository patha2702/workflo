import { Request, Response, NextFunction } from "express";
import User from "../database/models/user";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any ;
}

interface JwtPayload {
	id: string
}

export const authMiddleware = async(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Access denied, no token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
		const user = await User.findOne({
			_id: decoded?.id
		})
		if (! user) {
			return res.status(401).json({
				message: "User not found"
			})
		}
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      message: "Invalid token",
    });
  }
};
