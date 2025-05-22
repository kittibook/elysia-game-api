import { Elysia } from "elysia";
import authController from "../Controllers/Auth/auth.controller";

export const auth = new Elysia({ prefix : "/auth"})
  .post('/login', authController.login)
  .post('/register', authController.register)