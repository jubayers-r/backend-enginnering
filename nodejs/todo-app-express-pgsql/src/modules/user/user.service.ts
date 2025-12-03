import { pool } from "../../config/db.js";
import bcrypt from "bcryptjs";

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
  const { name, role, email, password, age, phone, address } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  return pool.query(
    `
    INSERT INTO users(name, role, email, password, age, phone, address) VALUES($1, $2, $3, $4, $5, $6, $7 ) RETURNING *
    `,
    [name, role, email, hashedPass, age, phone, address],
  );
};
export const userService = { getAllUsers, getUserById, createUser };
