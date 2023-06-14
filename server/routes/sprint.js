import express from "express";
import {
  getAllSprints,
  createSprint,
  deleteSprint,
  getSingleSprint,
  updateSprint,
} from "../controllers/sprint.js";

const router = express.Router();

router
  .route("/")
  .get(getAllSprints)
  .post(createSprint);
router
  .route("/:id")
  .get(getSingleSprint)
  .patch(updateSprint)
  .delete(deleteSprint);

export const sprintRouter = router;
