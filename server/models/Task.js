import Mongoose from "mongoose";
import { PROJECT_MODEL_NAME, SPRINT_MODEL_NAME, TASK_MODEL_NAME, USER_MODEL_NAME } from "../constants/models.js";
import { Schema } from "mongoose";

const TaskSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide task name"],
      trim: true,
      maxlength: 50,
      minlength: 3,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: [ "TODO", "DOING", "DONE" ],
      default: "TODO"
    },
    storypoints: {
      type: Number,
      min: 1,
      max: 10,
      default: 1 
    },
    sprint: {
      type: Schema.Types.ObjectId,
      ref: SPRINT_MODEL_NAME
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: PROJECT_MODEL_NAME,
      required: [true, "Please provide a project Id"]
    },
    assigne: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: [true, "Please provide a reporter Id"]
    }
  },
  { timestamps: true }
);

export const Task = Mongoose.model(TASK_MODEL_NAME, TaskSchema);
