import { db, PROJECT_STORE, TASKS_STORE } from "./init";
import { findSprintById } from "./sprint";

export const TASK_STATUSES = {
  TODO: "TODO",
  DOING: "DOING",
  DONE: "DONE"
}

export async function addTask(task, project) {
  const taskID = await (await db).add(TASKS_STORE, task);

  const newProject = {
    ...project,
    backlog: [ ...project.backlog, taskID ]
  }

  await (await db).put(PROJECT_STORE, newProject);
}

export async function getAllProjectsTasks(project) {
  if (project.backlog.length === 0) {
    return null;
  }

  const allTasks = await getAllTasks();
  const projectTasks = allTasks.filter((task) => project.backlog.indexOf(task.id) !== -1);

  return projectTasks.length > 0 ? projectTasks : null;
}

export async function getAllTasksNotInSprint(project) {
  if (project.backlog.length === 0) {
    return null;
  }

  const allTasks = await getAllTasks();
  const tasksNotInSprint = allTasks.filter((task) => project.backlog.indexOf(task.id) !== -1 && !task.sprint);

  return tasksNotInSprint.length > 0 ? tasksNotInSprint : null;
}

export async function getAllSprintTasks(id) {
  const sprint = await findSprintById(id);
  if (sprint.tasks.length === 0) {
    return null;
  }

  const allTasks = await getAllTasks();
  const sprintTasks = allTasks.filter((task) => sprint.tasks.indexOf(task.id) !== -1);

  return sprintTasks.length > 0 ? sprintTasks : null;
}

export async function editTaskById(newTask) {
  await (await db).put(TASKS_STORE, newTask);
}

export async function deleteTaskById(task, project) {
  await (await db).delete(TASKS_STORE, task.id);

  let newBacklog = project.backlog;
  newBacklog.splice(newBacklog.indexOf(task.id), 1)

  const newProject = {
    ...project,
    backlog: newBacklog
  }

  await (await db).put(PROJECT_STORE, newProject);
}

export async function getAllTasks() {
  return (await db).getAll(TASKS_STORE);
}

export async function findTaskById(id) {
  return await (await db).get(TASKS_STORE, id);
}