import { openDB } from 'idb';

// Database name and version
const DB_NAME = 'TodoAppDB';
const DB_VERSION = 1;

// Store names
const USER_STORE = 'users';
const TODO_STORE = 'todos';

// Initialize the database
const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(USER_STORE)) {
        db.createObjectStore(USER_STORE, { keyPath: 'email' });
      }
      if (!db.objectStoreNames.contains(TODO_STORE)) {
        db.createObjectStore(TODO_STORE, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// User-related functions
export const addUser = async (user) => {
  const db = await initDB();
  return db.put(USER_STORE, user);
};

export const getUser = async (email) => {
  const db = await initDB();
  return db.get(USER_STORE, email);
};

export const deleteUser = async (email) => {
  const db = await initDB();
  return db.delete(USER_STORE, email);
};

// Todo-related functions
export const addTodo = async (todo) => {
  const db = await initDB();
  return db.put(TODO_STORE, todo);
};

export const getTodos = async (userEmail) => {
  const db = await initDB();
  const todos = await db.getAll(TODO_STORE);
  return todos.filter(todo => todo.userEmail === userEmail);
};

export const deleteTodo = async (id) => {
  const db = await initDB();
  return db.delete(TODO_STORE, id);
};

export const clearTodos = async () => {
  const db = await initDB();
  const tx = db.transaction(TODO_STORE, 'readwrite');
  const store = tx.objectStore(TODO_STORE);
  await store.clear();
};
