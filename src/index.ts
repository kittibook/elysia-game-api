import { Elysia } from "elysia";
import { game } from "./Routes/game.route";
import { jwt } from '@elysiajs/jwt'
import { auth } from "./Routes/auth.route";
import { cors } from '@elysiajs/cors'
import { Dashboard } from "./Routes/admin.route";
import { PrismaClient } from "@prisma/client";
import staticPlugin from "@elysiajs/static";
const prisma = new PrismaClient();

const app = new Elysia()
  .use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))
  .use(staticPlugin())
  .use(
    jwt({
      name: 'jwt',
      secret: 'kittipon_book',
      exp: '1h'
    })
  )
  .use(game)
  .use(auth)

  .guard({
    beforeHandle: async ({ jwt, request, set, store }) => {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        set.status = 401;
        return { error: 'Unauthorized: Missing token' };
      }
      const token = authHeader.replace('Bearer ', '');
      const payload = await jwt.verify(token);
      if (!payload || typeof payload !== 'object') {
        set.status = 401;
        return { error: 'Unauthorized: Invalid token' };
      }
      if (!('id' in payload) || !('sessionId' in payload)) {
        set.status = 401;
        return { error: 'Unauthorized: Invalid token structure' };
      }
      const user = await prisma.admin.findUnique({
        where: { Admin_id: Number(payload.id) }
      });

      if (!user) {
        set.status = 401;
        return { error: 'Unauthorized: User not found' };
      }

      // 5. Store user in context
      // store.user = {
      //   id: payload.id,
      //   sessionId: payload.sessionId,
      //   adminData: user
      // };
    }
  },
    (app) =>
      app
        .use(Dashboard)
  )

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
