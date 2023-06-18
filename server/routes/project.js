import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "../controllers/project.js";
import { createProjectTask, getAllProjectTasks } from "../controllers/task.js";
import { createProjectSprint, getAllProjectSprints } from "../controllers/sprint.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(updateProject)
  .delete(deleteProject);
router.route("/:id/task")
  .get(getAllProjectTasks)
  .post(createProjectTask);
router.route("/:id/sprint")
  .get(getAllProjectSprints)
  .post(createProjectSprint);

export const projectRouter = router;
