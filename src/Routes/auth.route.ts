import { Elysia } from "elysia";
import authController from "../Controllers/auth.controller";

export const auth = new Elysia({ prefix : "/auth"})
  .post('/login', authController.login)