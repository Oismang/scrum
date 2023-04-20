import { db, USER_STORE } from "./init";

export const USER_COOKIE = "user_id";

export const USER_EXISTS_ERROR = "USER EXISTS";
export const USER_NOT_EXISTS_ERROR = "USER NOT EXISTS";
export const PASSWORD_NOT_MATCH_ERROR = "PASSWORD NOT MATCH";

export async function addUser(user) {
  const userObj = await findUserByName(user.name);

  if (userObj) {
    throw new Error(USER_EXISTS_ERROR);
  }

  return await (await db).add(USER_STORE, user);
}

export async function checkUser(user) {
  const userObj = await findUserByName(user.name);

  if (!userObj) {
    throw new Error(USER_NOT_EXISTS_ERROR);
  }

  if (user.password !== userObj.password) {
    throw new Error(PASSWORD_NOT_MATCH_ERROR);
  }

  return userObj;
}

export async function editUser(user, id) {
  return await (await db).put(USER_STORE, user, id);
}

export async function getAllUsers() {
  return await (await db).getAll(USER_STORE);
}

export async function deleteAllUsers() {
  await (await db).clear(USER_STORE);
}

export async function deleteUserById(id) {
  await (await db).delete(USER_STORE, id);
}

export async function findUserById(id) {
  return await (await db).get(USER_STORE, id);
}

export async function findUserByName(name) {
  return await (await db).getFromIndex(USER_STORE, "nameIndex", name);
}
