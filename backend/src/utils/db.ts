import mongoose from "mongoose";
import User from "../database/models/user";
import bcrypt from "bcrypt";

export async function getDBConnection() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("Connected to database");
  } catch (err: any) {
    console.error(`Error connecting to db: ${err.message}`);
  }
}

export async function getUser(email: string) {
  try {
    const user = await User.findOne({
      email: email,
    });
    return user;
  } catch (err: any) {
    console.log(err)
    throw new Error(err);
  }
}

export async function hashPassword(password: string) {
  const saltRounds = 10
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds
    );
    return hashedPassword;
  } catch (err: any) {
    console.log(err)
    throw new Error(err);
  }
}
