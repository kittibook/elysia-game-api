import { Elysia } from "elysia";
import gameController from "../Controllers/game.controller";

export const game = new Elysia({ prefix : "/game"})
  .post('/upload', gameController.gameSave)
  .get('/dataset', gameController.getDataSet)
  .get('/test', gameController.getDataUser)
  .post('/imagecheck', gameController.Checkimage)