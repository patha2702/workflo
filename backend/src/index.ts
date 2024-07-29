import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import taskRouter from "./routes/task"
import { getDBConnection } from "./utils/db";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)

getDBConnection()

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
