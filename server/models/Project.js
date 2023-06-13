import Mongoose from "mongoose";
import { PROJECT_MODEL_NAME, SPRINT_MODEL_NAME, USER_MODEL_NAME } from "../constants/models.js";

const ProjectSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide project name"],
      maxlength: 100,
      minlength: 3,
    },
    backlog: [
      {
        type: Mongoose.Types.ObjectId,
        ref: USER_MODEL_NAME,
        required: true,
      },
    ],
    sprints: [
      {
        type: Mongoose.Types.ObjectId,
        ref: SPRINT_MODEL_NAME,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Project = Mongoose.model(PROJECT_MODEL_NAME, ProjectSchema);
