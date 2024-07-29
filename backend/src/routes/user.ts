import { Router, Request, Response } from "express";
import { signUpSchema, signInSchema } from "../schemas/userSchema";
import User from "../database/models/user";
import { getUser, hashPassword } from "../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/sign-up", async (req: Request, res: Response) => {
  const body = req.body;
  const { data, success, error } = signUpSchema.safeParse(body);
  if (!success) {
    res.status(411).json({
      message: error.issues[0].message,
    });
    return;
  }
  try {
    const existingUser = await getUser(data.email);
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please login",
      });
    }
    const hashedPassword = await hashPassword(data.password);
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword,
    });
    return res.status(201).json({
      userId: user._id,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again",
      error: err,
    });
  }
});

router.post("/sign-in", async (req: Request, res: Response) => {
  const body = req.body;
  const { data, success, error } = signInSchema.safeParse(body);
  if (!success) {
    res.status(411).json({
      message: error.issues[0].message,
    });
    return;
  }
  try {
    const existingUser = await getUser(data.email);
    if (!existingUser) {
      return res.status(404).json({
        message: "No account found, please sign up",
      });
    }
    const validCredentials = await bcrypt.compare(
      data.password,
      existingUser.passwordHash
    );
    if (!validCredentials) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        email: data.email,
      },
      process.env.JWT_SECRET || ""
    );
    return res.status(200).json({
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
});

export default router;
