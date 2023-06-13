import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request.js";
import { UnauthenticatedError } from "../errors/unauthenticated.js";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("User with this email is not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password for user with this email");
  }

  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token });
};
