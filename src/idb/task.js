import { db, PROJECT_STORE, TASKS_STORE } from "./init";

export const TASK_STATUSES = {
  TODO: "TODO",
  DOING: "DOING",
  DONE: "DONE"
}

export async function addTask(task, project) {
  const taskID = await db.add(TASKS_STORE, task);

  const newProject = {
    ...project,
    backlog: [ ...project.backlog, taskID ]
  }

  await db.put(PROJECT_STORE, newProject);
}

export async function getAllProjectsTasks(project) {
  if (project.backlog.length === 0) {
    return null;
  }

  const allTasks = await getAllTasks();
  const projectTasks = allTasks.filter((task) => project.backlog.indexOf(task.id) !== -1);

  return projectTasks.length > 0 ? projectTasks : null;
}

export async function editTaskById(newTask) {
  await db.put(TASKS_STORE, newTask);
}

export async function deleteTaskById(task, project) {
  await db.delete(TASKS_STORE, task.id);

  let newBacklog = project.backlog;
  newBacklog.splice(newBacklog.indexOf(task.id), 1)

  const newProject = {
    ...project,
    backlog: newBacklog
  }

  await db.put(PROJECT_STORE, newProject);
}

export async function getAllTasks() {
  return db.getAll(TASKS_STORE);
}