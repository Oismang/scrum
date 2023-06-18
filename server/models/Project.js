import Mongoose from "mongoose";
import { PROJECT_MODEL_NAME } from "../constants/models.js";

const ProjectSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide project name"],
      maxlength: 100,
      minlength: 3,
    },
  },
  { timestamps: true }
);

export const Project = Mongoose.model(PROJECT_MODEL_NAME, ProjectSchema);
