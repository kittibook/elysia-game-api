import { PrismaClient } from "@prisma/client";
import { config } from "../../Config/config";
const prisma = new PrismaClient()

export default {
    getUser : async() => {
        try {
            if (config.debugger) {
                console.log('getUser: Starting ');
            }
            const data = await prisma.user.findMany({ include : {
                Dataset : true,
                Position :true,
                Game : true
            } })
            if (config.debugger) {
                console.log('getUser: user ', {data});
            }
            return {
                success : true,
                data : data
            }
        } catch (error) {
            console.error('getDataSet: Error fetching datasets', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                data: [],
                message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
            }
        }
    }
}