import { Elysia } from "elysia";
import { game } from "./Routes/game.route";
import { jwt } from '@elysiajs/jwt'
import { auth } from "./Routes/auth.route";
import { cors } from '@elysiajs/cors'
const app = new Elysia()
  .use(cors( { origin : '*'}))
  .use(
    jwt({
      name: 'jwt',
      secret: 'kittipon book'
    })
  )
  .get("/", () => "Hello Elysia")
  .use(game)
  .use(auth)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
