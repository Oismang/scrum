import { StatusCodes } from "http-status-codes";
import { Project } from "../models/Project.js";
import { NotFoundError } from "../errors/not-found.js";
import { BadRequestError } from "../errors/bad-request.js";
import { Task } from "../models/Task.js";
import { Sprint } from "../models/Sprint.js";

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({}).sort("createdAt");

  res.status(StatusCodes.OK).json({ projects, nbHits: projects.length });
};

export const getSingleProject = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError(`No project with id: ${projectId}`);
  }

  res.status(StatusCodes.OK).json({ project });
};

export const createProject = async (req, res) => {
  const project = await Project.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ project });
};

export const updateProject = async (req, res) => {
  const {
    params: { id: projectId },
    body: { name },
  } = req;

  if (!name) {
    throw new BadRequestError("Field Name cannot be empty.");
  }

  const project = await Project.findByIdAndUpdate(projectId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new NotFoundError(`No project with id ${projectId}`);
  }

  res.status(StatusCodes.OK).json({ project });
};

export const deleteProject = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.findByIdAndRemove(projectId);

  if (!project) {
    throw new NotFoundError(`No project with id ${projectId}`);
  }

  const infoTask = await Task.deleteMany({ project: projectId });
  const infoSprint = await Sprint.deleteMany({ project: projectId });

  res
    .status(StatusCodes.OK)
    .send({
      taskDeletedCount: infoTask.deletedCount,
      sprintDeletedCount: infoSprint.deletedCount,
    });
};
