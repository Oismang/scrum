import { openDB } from "idb";

export const PROJECT_STORE = "project";
export const SPRINT_STORE = "sprint";
export const TASKS_STORE = "tasks";
export const USER_STORE = "user";

export let db;

initDB();

async function initDB() {
  db = await openDB("scrum", 1, {
    upgrade(db) {
      // create project store
      if (!db.objectStoreNames.contains(PROJECT_STORE)) {
        const store = db.createObjectStore(PROJECT_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("backlogIndex", "backlog", { multiEntry: true });
        store.createIndex("sprintIndex", "sprints", { multiEntry: true });
      }

      // create sprint store
      if (!db.objectStoreNames.contains(SPRINT_STORE)) {
        const store = db.createObjectStore(SPRINT_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("taskIndex", "tasks", { multiEntry: true });
      }

      // create tasks store
      if (!db.objectStoreNames.contains(TASKS_STORE)) {
        db.createObjectStore(TASKS_STORE, { keyPath: "id", autoIncrement: true });
      }

      // create user store
      if (!db.objectStoreNames.contains(USER_STORE)) {
        const store = db.createObjectStore(USER_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("nameIndex", "name", { unique: true });
        store.createIndex("projectIndex", "projects", { multiEntry: true });
      }
    },
  });
}