import { Elysia } from "elysia";
import gameController from "../Controllers/Games/game.controller";
import getSettingGameController from "../Controllers/Games/Setting/getSetting.game.controller";

export const game = new Elysia({ prefix: "/game" })
  .post('/upload', gameController.gameSave)
  .get('/dataset', gameController.getDataSet)
  .get('/test', gameController.getDataUser)
  .post('/imagecheck', gameController.Checkimage)
  .group('/setting', app => {
    return app
      .get('/', getSettingGameController.getSetting)
      .get('/:id', getSettingGameController.getSettingById)
      .get('/name/:name', getSettingGameController.getSettingByName)

  })