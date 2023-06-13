import express from "express";
import {
  createProject,
  getAllProjects,
  getSingleProject,
} from "../controllers/project.js";

const router = express.Router();

router.route("/").get(getAllProjects).post(createProject);
router.route("/:id").get(getSingleProject);

export const projectRouter = router;
