import { StatusCodes } from "http-status-codes";
import { Project } from "../models/Project.js";
import { NotFoundError } from "../errors/not-found.js";

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({}).sort("createdAt");

  res.status(StatusCodes.OK).json({ projects, nbHits: projects.length });
};

export const getSingleProject = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.findOne({ _id: projectId });

  if (!project) {
    throw NotFoundError(`No project with id: ${projectId}`);
  }

  res.status(StatusCodes.OK).json({ project });
};

export const createProject = async (req, res) => {
  const project = await Project.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ project });
};

export const updateProject = async (req, res) => {
  const project = await Project.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ project });
};

export const deleteProject = async (req, res) => {
  const project = await Project.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ project });
};