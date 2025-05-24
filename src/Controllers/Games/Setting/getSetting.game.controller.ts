import { config } from "../../../Config/config"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
    getSetting: async () => {
        try {

            if (config.debugger) {
                console.log('getSetting : Fetching Setting')
            }

            const Setting = await prisma.settingGame.findMany({
                include : {
                    SettingGameDetail : true
                }
            })

            if (config.debugger && Setting) {
                console.log('getSetting : Data SettingGame ', Setting)
            }

            return {
                success: true,
                Setting: Setting
            }
        } catch (error) {
            console.error('getSetting : Error fetching ', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาด"
            }
        }
    },
    getSettingById: async ({ params }: { params: { id: string } }) => {
        try {

            if (config.debugger) {
                console.log('getSettingById : Fetching Setting By Id')
            }

            const { id } = params

            if (config.debugger) {
                console.log('getSettingById : Param Id = ', id)
            }

            const Setting = await prisma.settingGame.findFirst({ where: { SettingGame_id: Number(id) } })

            if (config.debugger) {
                console.log('getSettingById : Data SettingGame ', Setting)
            }

            return {
                success: true,
                Setting: Setting
            }
        } catch (error) {
            console.error('getSettingById : Error fetching ', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาด"
            }
        }
    },
    getSettingByName: async ({ params }: { params: { name: string } }) => {
        try {
            if (config.debugger) {
                console.log('getSettingByName : Fetching Setting By Name')
            }
            const { name } = params

            if (!name) {
                if (config.debugger) {
                    console.log('getSettingByName : Not fount name')
                }
            }

            if (config.debugger) {
                console.log('getSettingByName : Found the Name = ', name)
            }

            const Setting = await prisma.settingGame.findFirst({ where: { name: name } })

            if (!Setting) {
                if (config.debugger) {
                    console.log('getSettingByName : Not Fount Setting By Name')
                }
                return {
                    success: false,
                    message: `ไม่พบ Setting ชื่อ ${name} ในฐานข้อมูล`
                }
            }

            if(config.debugger){
                console.log('getSettingByName : Setting By name = ', Setting)
            }

            const detail = await prisma.settingGameDetail.findFirst({ where : { SettingGameid : Setting.SettingGame_id}})
            if (!detail) {
                if (config.debugger) {
                    console.log('getSettingByName : Not Fount detail By Name')
                }
                return {
                    success: false,
                    message: `ไม่พบ Settingdetail ชื่อ ${name} ในฐานข้อมูล`
                }
            }

            if(config.debugger){
                console.log('getSettingByName : Setting detail By name = ', detail)
            }

            return {
                success : true,
                setting : detail
            }
        } catch (error) {
            console.error('getSettingById : Error fetching ', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาด"
            }
        }
    }
}