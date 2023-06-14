import express from "express";
import { getAllUsers, getSingleUser } from "../controllers/user.js";

const router = express.Router();

router
  .route("/")
  .get(getAllUsers);
router
  .route("/:id")
  .get(getSingleUser);

export const userRouter = router;
