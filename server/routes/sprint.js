import express from "express";
import {
  deleteSprint,
  getAllSprints,
  getSingleSprint,
  updateSprint
} from "../controllers/sprint.js";

const router = express.Router();

router
  .route("/")
  .get(getAllSprints)
router
  .route("/:id")
  .get(getSingleSprint)
  .patch(updateSprint)
  .delete(deleteSprint);

export const sprintRouter = router;
