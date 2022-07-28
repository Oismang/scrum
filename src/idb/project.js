import { db, PROJECT_STORE, USER_STORE } from "./init";

export async function addProject(user, project) {
  const projectId = await db.add(PROJECT_STORE, project);

  const newUser = {
    ...user,
    projects: [ ...user.projects, projectId ]
  }

  await db.put(USER_STORE, newUser);
}

export async function getAllUserProjects(user) {
  if (user.projects.length === 0) {
    return null;
  }

  const allProjects = await getAllProjects();
  const userProjects = allProjects.filter((project) => user.projects.indexOf(project.id) !== -1);

  return userProjects.length > 0 ? userProjects : null;
}

export async function deleteUserProjectById(projectID, user) {
  await deleteProjectById(projectID);

  let newProjects = user.projects;
  newProjects.splice(newProjects.indexOf(projectID), 1)

  const newUser = {
    ...user,
    projects: newProjects
  }

  await db.put(USER_STORE, newUser);
}

export async function editProjectById(project, newName) {
  const newProject = {
    ...project,
    name: newName
  }

  await db.put(PROJECT_STORE, newProject);
}

export async function getAllProjects() {
  return db.getAll(PROJECT_STORE);
}

export async function deleteProjectById(id) {
  await db.delete(PROJECT_STORE, id);
}

export async function findProjectById(id) {
  return await db.get(PROJECT_STORE, id);
}
