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

const createUser = async (
  name: string,
  email: string,
  age: number,
  phone: string,
  address: string,
) =>
  pool.query(
    `
    INSERT INTO users(name, email, age, phone, address)VALUES($1, $2, $3, $4, $5 ) RETURNING *
    `,
    [name, email, age, phone, address],
  );

export const userService = { getAllUsers, getUserById, createUser };
