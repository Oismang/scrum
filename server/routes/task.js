import express from "express";
import {
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask
} from "../controllers/task.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
router
  .route("/:id")
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteTask);

export const taskRouter = router;
