import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";
import { NotFoundError } from "../errors/not-found.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort("createdAt");

  res.status(StatusCodes.OK).json({ users, nbHits: users.length });
};

export const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError(`No user with id: ${userId}`);
  }

  res.status(StatusCodes.OK).json({ user });
};
