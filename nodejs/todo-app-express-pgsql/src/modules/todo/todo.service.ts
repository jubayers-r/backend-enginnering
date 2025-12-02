import { pool } from "../../config/db.js";

const getTodos = async (uid: string) =>
  pool.query(
    `
    SELECT * FROM todos WHERE user_id = $1
    `,
    [uid],
  );

const createTodo = async (
  uid: string,
  title: string,
  description: string,
  completed: boolean,
  due_date: string,
) =>
  pool.query(
    `
    INSERT INTO todos(user_id, title, description, completed, due_date) VALUES($1, $2, $3, $4, $5) RETURNING *
    `,
    [uid, title, description, completed, due_date],
  );

export const todoService = {
  getTodos,
  createTodo,
};
