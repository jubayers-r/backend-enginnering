import { pool } from "../../config/db.js";

const getAllUsers = async () =>
  pool.query(
    `
    SELECT * FROM users
    `,
  );

const getUserById = async (userId: string) =>
  pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [userId],
  );

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, age, phone, address } = payload;
  return pool.query(
    `
    INSERT INTO users(name, email, age, phone, address)VALUES($1, $2, $3, $4, $5 ) RETURNING *
    `,
    [name, email, age, phone, address],
  );
};
export const userService = { getAllUsers, getUserById, createUser };
