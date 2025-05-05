
import { PrismaClient } from "@prisma/client";
import { modelJWT, modelLogin } from "../Models/auth.model"
import { JWTOption, JWTPayloadSpec } from "@elysiajs/jwt";
const prisma = new PrismaClient()
export default {
    login: async ({body , jwt } : { body: modelLogin, jwt :  modelJWT}) => {
        try {
            if (!body.username || !body.password) {
                return {
                    status: 'error',
                    message: 'Email and password are required',
                    code: 400
                };
            }
            const admin = await prisma.admin.findFirst({ where: { username: body.username } })
            const hash = await Bun.password.hash(body.password);
            if (!admin || await Bun.password.verify(admin.password, hash)) {
                return {
                    status: 'error',
                    message: 'Invalid email or password',
                    code: 401
                };
            }

            const token = await jwt.sign({
                id: admin.id,
                username: admin.username,
                email: admin.email,
                roleId: admin.roleId,
                createdAt: admin.createdAt,
            });
            if (!token || typeof token !== "string" || token.trim() === "") {
                throw new Error("ไม่สามารถสร้าง JWT token ได้");
            }
            return {
                status: "success",
                token,
                code: 200,
            };

            

        } catch (error) {
            console.error(error)
            return {
                status: 'error',
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                code: error instanceof Error && 'code' in error ? Number(error.code) : 500
            }
        }
    }
}