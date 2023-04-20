import { db, PROJECT_STORE, SPRINT_STORE } from "./init";
import { editTaskById, findTaskById } from "./task";

export async function addSprint(sprint, project) {
  const sprintId = await (await db).add(SPRINT_STORE, sprint);

  const newProject = {
    ...project,
    sprints: [ ...project.sprints, sprintId ]
  }

  await (await db).put(PROJECT_STORE, newProject);
}

export async function getAllProjectsSprints(project) {
  if (project.sprints.length === 0) {
    return null;
  }

  const allSprints = await getAllSprints();
  const sprintTasks = allSprints.filter((sprint) => project.sprints.indexOf(sprint.id) !== -1);

  return sprintTasks.length > 0 ? sprintTasks : null;
}

export async function addTaskToSprint(sprint, id) {
  const task = await findTaskById(id);
  const newSprint = {
    ...sprint,
    tasks: [ ...sprint.tasks, id ]
  };

  const newTask = {
    ...task,
    sprint: sprint.id
  }

  await editSprint(newSprint);
  await editTaskById(newTask);

  return newTask;
}

export async function removeTaskFromSprint(sprintId, taskId) {
  const sprint = await findSprintById(sprintId);
  const task = await findTaskById(taskId);
  const newSprintTasks = sprint.tasks.splice(sprint.tasks.indexOf(taskId), 1);
  const newSprint = {
    ...sprint,
    tasks: newSprintTasks
  };
  const newTask = {
    ...task,
    sprint: null
  }

  await editSprint(newSprint);
  await editTaskById(newTask);

  return newTask;
}

export async function getAllSprints() {
  return (await db).getAll(SPRINT_STORE);
}

export async function editSprint(sprint) {
  await (await db).put(SPRINT_STORE, sprint);
}

export async function deleteSprint(id) {
  await (await db).delete(SPRINT_STORE, id);
}

export async function findSprintById(id) {
  return await (await db).get(SPRINT_STORE, id);
}