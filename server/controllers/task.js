import { StatusCodes } from "http-status-codes";
import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";
import { NotFoundError } from "../errors/not-found.js";
import { BadRequestError } from "../errors/bad-request.js";

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find({}).sort("createdAt");

  res.status(StatusCodes.OK).json({ tasks, nbHits: tasks.length });
};

export const getAllProjectTasks = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError(`No project with id: ${projectId}`);
  }

  const tasks = await Task.find({ project: projectId })
    .populate("assigne")
    .populate("reporter")
    .populate("sprint")
    .sort("createdAt");

  res.status(StatusCodes.OK).json({ tasks, nbHits: tasks?.length });
};

export const getSingleTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new NotFoundError(`No task with id: ${taskId}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

export const createProjectTask = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError(`No project with id: ${projectId}`);
  }

  const newTask = {
    ...req.body,
    project: projectId,
    reporter: req.user.userId,
  };
  const task = await Task.create({ ...newTask });

  res.status(StatusCodes.CREATED).json({ task });
};

export const updateTask = async (req, res) => {
  const {
    params: { id: taskId },
    body: { name },
  } = req;

  if (!name) {
    throw new BadRequestError("Field Name cannot be empty.");
  }

  const task = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

export const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findByIdAndRemove(taskId);

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }

  res.status(StatusCodes.OK).send();
};
