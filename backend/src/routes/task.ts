import { Router, Request, Response } from "express";
import {
  taskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} from "../schemas/taskSchema";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import Task from "../database/models/task";

const router = Router();

router.use(authMiddleware);

router.post("/", async (req: AuthRequest, res: Response) => {
  const body = req.body;
  const { data, success, error } = taskSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid inputs",
      error: error.issues[0].message,
    });
  }
  try {
    const task = await Task.create({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      deadline: data.deadline,
      author: req?.user?.id,
    });
    return res.status(201).json({
      message: "Task created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again",
      error: err,
    });
  }
});

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const tasks = await Task.find({
      author: userId,
    });
    return res.status(200).json({
      tasks: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again",
      error: err,
    });
  }
});

router.put("/", async (req: AuthRequest, res: Response) => {
  const userId = req?.user?._id;
  const { data, success, error } = updateTaskSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid inputs",
      error: error.issues[0].message,
    });
  }
  try {
    const task = await Task.findOne({
      _id: data.id,
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    if (task.author.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You don't have permissions to update this task",
      });
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: data.id },
      {
        ...data,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    console.log("Error updating the task: ", err);
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
  }
});

router.delete("/", async (req: AuthRequest, res: Response) => {
  const userId = req?.user?._id;
  const { data, success, error } = deleteTaskSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid inputs",
      error: error.issues[0].message,
    });
  }
  try {
    const task = await Task.findOne({
      _id: data.id,
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    if (task.author.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You don't have permissions to delete this task",
      });
    }
    await Task.deleteOne({ _id: data.id });
    return res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (err) {
    console.log("Error Deleting the task: ", err);
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
  }
});

export default router;
