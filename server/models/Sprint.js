import Mongoose, { Schema } from "mongoose";
import { PROJECT_MODEL_NAME, SPRINT_MODEL_NAME } from "../constants/models.js";

const convertDate = (date) => new Date(date).toISOString().split('T')[0];

const SprintSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide sprint name"],
      maxlength: 100,
      minlength: 3,
    },
    startDate: {
      type: Date,
      required: [true, "Please provide start date"],
      get: convertDate,
    },
    endDate: {
      type: Date,
      required: [true, "Please provide end date"],
      get: convertDate,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: PROJECT_MODEL_NAME,
      required: [true, "Please provide project Id"],
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

export const Sprint = Mongoose.model(SPRINT_MODEL_NAME, SprintSchema);
