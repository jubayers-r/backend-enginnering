import bcrypt from "bcryptjs";
import { pool } from "../../config/db.js";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const verifyUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  if (!result.rows.length) return null;
  const user = result.rows[0];


  const match = await bcrypt.compare(password, user.password);
  if (!match) return false;
  delete user.password;

  const secret = config.jwt_secret;
  const accessToken = jwt.sign(
    { id: user.id, email, role: user.role },
    secret as string,
    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign({ id: user.id }, secret as string, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken, user };
};

export const authServices = {
  verifyUser,
};
