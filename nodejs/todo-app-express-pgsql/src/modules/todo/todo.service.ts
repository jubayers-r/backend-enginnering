import { pool } from "../../config/db.js";

const getTodos = async (uid: string) =>
  pool.query(
    `
    SELECT * FROM todos WHERE user_id = $1
    `,
    [uid],
  );

const createTodo = async (uid: string, payload: Record<string, unknown>) => {
  const { title, description, completed, due_date } = payload;
  return pool.query(
    `
    INSERT INTO todos(user_id, title, description, completed, due_date) VALUES($1, $2, $3, $4, $5) RETURNING *
    `,
    [uid, title, description, completed, due_date],
  );
};
export const todoService = {
  getTodos,
  createTodo,
};
