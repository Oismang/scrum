import { openDB } from "idb";
import { TASK_STATUSES } from "./task";

export const PROJECT_STORE = "project";
export const SPRINT_STORE = "sprint";
export const TASKS_STORE = "tasks";
export const USER_STORE = "user";

export const initialState = {
  user: {
    id: 1,
    email: "",
    name: "",
    password: "",
    projects: [],
  },
  project: {
    id: 1,
    name: "",
    backlog: [],
    sprints: [],
  },
  task: {
    id: 1,
    name: "",
    description: "",
    sprint: null,
    status: TASK_STATUSES.TODO,
    storypoints: 1,
    datecreation: new Date(),
    duedate: new Date(),
  },
  sprint: {
    id: 1,
    name: "",
    startdate: new Date(),
    enddate: new Date(),
    tasks: [],
  },
};

export const db = openDB("scrum", 1, {
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
      db.createObjectStore(TASKS_STORE, {
        keyPath: "id",
        autoIncrement: true,
      });
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
