import Mongoose from "mongoose";
import { SPRINT_MODEL_NAME, USER_MODEL_NAME } from "../constants/models.js";

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
    sprint: {
      type: Mongoose.Types.ObjectId,
      ref: SPRINT_MODEL_NAME
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
    assigne: {
      type: Mongoose.Types.ObjectId,
      ref: USER_MODEL_NAME
    },
    reporter: {
      type: Mongoose.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true
    }
  },
  { timestamps: true }
);

export const Task = Mongoose.model(TASK_MODEL_NAME, TaskSchema);
