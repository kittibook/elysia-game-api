import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import jwt from "@elysiajs/jwt";

const prisma = new PrismaClient();

export const authGuard = (jwtConfig: { secret: string }) => {
  return new Elysia()
    .use(
      jwt({
        name: 'jwt',
        secret: jwtConfig.secret,
        exp: '1h'
      })
    )
    .guard({
      beforeHandle: async ({ jwt, request, set, store }) => {
        // 1. Check Authorization header
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
          set.status = 401;
          return { error: 'Unauthorized: Missing token' };
        }

        // 2. Extract and verify token
        const token = authHeader.slice(7);
        const payload = await jwt.verify(token);
        
        if (!payload || typeof payload !== 'object') {
          set.status = 401;
          return { error: 'Unauthorized: Invalid token' };
        }

        // 3. Type checking for payload
        if (!('id' in payload) || !('sessionId' in payload)) {
          set.status = 401;
          return { error: 'Unauthorized: Invalid token structure' };
        }

        // 4. Check user exists
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
    });
};