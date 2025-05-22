import { Elysia } from "elysia";
import dashboardUserController from "../Controllers/Dashboard/dashboard.user.controller";
import getSettingGameController from "../Controllers/Games/Setting/getSetting.game.controller";
import settingGameController from "../Controllers/Games/Setting/setting.game.controller";

export const Dashboard = new Elysia({ prefix : "/admin"})    
    .get('/user', dashboardUserController.getUser)
    .group('/setting', app => {
        return app
            .get('/', getSettingGameController.getSetting)
            .get('/:id', getSettingGameController.getSettingById)
            .get('/name/:name', getSettingGameController.getSettingByName)
            .put('/draw-setting', settingGameController.settingGame1)
            .put('/card-match-setting', settingGameController.settingGame23)
            .put('/sound-match-setting', settingGameController.settingGame456)
            .post('/setup', settingGameController.initializeDefaultGameSettings)
    })