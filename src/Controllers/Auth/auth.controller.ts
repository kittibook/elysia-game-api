
import { PrismaClient } from "@prisma/client";
import { modelJWT, modelLogin } from "../../Models/auth.model"
import { JWTOption, JWTPayloadSpec } from "@elysiajs/jwt";
import { config } from "../../Config/config";
const prisma = new PrismaClient()
export default {
    login: async ({ body, jwt }: { body: modelLogin, jwt: modelJWT }) => {
        try {
            if (config.debugger) {
                console.log('login : Starting !!! \n data = ', body)
            }
            if (!body.username || !body.password) {
                if (config.debugger) {
                    console.log('login : Email and password are required')
                }
                return {
                    success: false,
                    message: 'ไม่พบข้อมูล ชื่อผู้ใช้งานหรือรหัสผ่าน',
                };
            }
            const admin = await prisma.admin.findFirst({ where: { username: body.username} })
            if(!admin) {
                if (config.debugger) {
                    console.log('login : Not Data Admin From Username And Status')
                }
                return {
                    success : false,
                    message : 'ไม่พบชื่อผู้ใช้งานนี้'
                }
            }
            if(admin.status === 0 ) {
                if (config.debugger) {
                    console.log('login : Status Not Active')
                }
                return {
                    success : false,
                    message : 'ชื่อผู้ใช้งานนี้ยังไม่มีสิทธ์ในการใช้งาน โปรดติดต่อผู้ดูแลระบบ'
                }
            }
            const hash = await Bun.password.hash(body.password);
            if (await Bun.password.verify(admin.password, hash)) {
                if (config.debugger) {
                    console.log('login : Invalid username or password')
                }
                return {
                    success: false,
                    message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง',
                };
            }
            const sessionId = require('nanoid').nanoid();
            const token = await jwt.sign({
                id: admin.Admin_id,
                username: admin.username,
                email: admin.email,
                sessionId,
                createdAt: admin.createdAt,
            });
            if (!token || typeof token !== "string" || token.trim() === "") {
                if (config.debugger) {
                    console.log('login : Not Create JWT token ')
                }
                throw new Error("ไม่สามารถสร้าง JWT token ได้");
            }
            if (config.debugger) {
                console.log('login : JWT Token =  ', token)
            }
            return {
                status: "success",
                token,
            };



        } catch (error) {
            console.error('login : Error ', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
            }
        }
    },
    register: async ({ body }: { body: { username: string, email: string, password: string, passwordconfirm: string } }) => {
        try {
            if (config.debugger) {
                console.log('register : Start !!!')
            }
            const { username, email, password, passwordconfirm } = body
            if (config.debugger) {
                console.log('register : data body = ', body)
            }

            if (password !== passwordconfirm) {
                if (config.debugger) {
                    console.log('register : password Not Match')
                }
                return { success: false, message: 'รหัสผ่านไม่ตรงกัน' }
            }

            const existingUser = await prisma.admin.findFirst({
                where: {
                    OR: [
                        { username },
                        { email }
                    ]
                }
            })

            if (existingUser) {
                if (config.debugger) {
                    console.log('register : Username or Email is already used.')
                }
                return { success: false, message: 'Username หรือ Email ถูกใช้ไปแล้ว' }
            }
            const hash = await Bun.password.hash(password)
            const data = await prisma.admin.create({
                data: {
                    username: username,
                    email: email,
                    password: hash,
                }
            })
            if (config.debugger) {
                console.log('register : Create User successfully User Data = ', data)
            }
            return {
                success: true,
                message: 'สร้างข้อมูลผู้ใช้งานสำเร็จ'
            }

        } catch (error) {
            console.error('register : Error ', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
            }
        }
    }
}