import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "../controllers/project.js";

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

export const projectRouter = router;
