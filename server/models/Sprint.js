import Mongoose from "mongoose";
import { TASK_MODEL_NAME } from "../constants/models.js";

const SprintSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide sprint name"],
      maxlength: 100,
      minlength: 3,
    },
    startDate: [
      {
        type: Date,
        required: [true, "Please provide start date"],
      },
    ],
    endDate: [
      {
        type: Date,
        required: [true, "Please provide end date"],
      },
    ],
    tasks: [
      {
        type: Mongoose.Types.ObjectId,
        ref: TASK_MODEL_NAME
      },
    ],
  },
  { timestamps: true }
);

export const Sprint = Mongoose.model(SPRINT_MODEL_NAME, SprintSchema);
