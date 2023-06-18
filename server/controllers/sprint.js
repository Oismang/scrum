import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/not-found.js";
import { Project } from "../models/Project.js";
import { Sprint } from "../models/Sprint.js";
import { Task } from "../models/Task.js";
import { BadRequestError } from "../errors/bad-request.js";

export const getAllSprints = async (req, res) => {
  const sprints = await Sprint.find({}).sort("createdAt");

  res.status(StatusCodes.OK).json({ sprints, nbHits: sprints.length });
};

export const getAllProjectSprints = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError(`No project with id: ${projectId}`);
  }

  const sprints = await Sprint.find({ project: projectId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ sprints, nbHits: sprints?.length });
};

export const getSingleSprint = async (req, res) => {
  const { id: sprintId } = req.params;

  const sprint = await Sprint.findById(sprintId);

  if (!sprint) {
    throw new NotFoundError(`No sprint with id: ${sprintId}`);
  }

  res.status(StatusCodes.OK).json({ sprint });
};

export const createProjectSprint = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new NotFoundError(`No project with id: ${projectId}`);
  }

  const newSprint = {
    ...req.body,
    project: projectId,
  };
  const sprint = await Sprint.create({ ...newSprint });

  res.status(StatusCodes.CREATED).json({ sprint });
};

export const updateSprint = async (req, res) => {
  const {
    params: { id: sprintId },
    body: { name, startDate, endDate },
  } = req;

  if (!name) {
    throw new BadRequestError("Field Name cannot be empty.");
  }

  if (!startDate) {
    throw new BadRequestError("Field startDate cannot be empty.");
  }

  if (!endDate) {
    throw new BadRequestError("Field endDate cannot be empty.");
  }

  const sprint = await Sprint.findByIdAndUpdate(sprintId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!sprint) {
    throw new NotFoundError(`No sprint with id ${sprintId}`);
  }

  res.status(StatusCodes.OK).json({ sprint });
};

export const deleteSprint = async (req, res) => {
  const { id: sprintId } = req.params;

  const sprint = await Sprint.findByIdAndRemove(sprintId);

  if (!sprint) {
    throw new NotFoundError(`No sprint with id ${sprintId}`);
  }

  const info = await Task.updateMany(
    { sprint: sprintId },
    { $unset: { sprint: "" } }
  );

  res.status(StatusCodes.OK).send({ modifiedTasksCount: info });
};
