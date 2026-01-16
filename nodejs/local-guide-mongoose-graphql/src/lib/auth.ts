import { client } from "@/server.js";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
export const auth = betterAuth({
  database: mongodbAdapter(client),
});
