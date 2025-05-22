import { nanoid } from "nanoid";
import { config } from "../../../Config/config";
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default {
    settingGame1: async ({ body }: { body: { setting: string, image: File, position: string, problems: Array<string> } }) => {
        try {
            if (config.debugger) {
                console.log('settingGame1 : Setting original');
            }
            const { setting, image, position, problems } = body;
            if (!image || !(image instanceof File)) {
                if (config.debugger) {
                    console.log(`settingGame1 : No File Image`);
                }

                return {
                    success: false,
                    message: 'ไม่พบไฟล์รูปภาพ'
                }
            }
            const SettingGame = await prisma.settingGame.findFirst({ where: { SettingGame_id: Number(setting) } })
            if (!SettingGame) {
                if (config.debugger) {
                    console.log(`settingGame1 : No SettingGame ID`);
                }

                return {
                    success: false,
                    message: 'ไม่ข้อมูลการตั้งค่านี้'
                }
            }
            const fileExtension = image.name.split('.').pop(); // ดึงนามสกุลไฟล์
            const newFileName = `${nanoid()}.${fileExtension}`; // สร้างชื่อใหม่
            const filePath = `public/imagegame/${newFileName}`;
            if (config.debugger) {
                console.log('settingGame1 : saved file', { filePath, originalName: image.name });
            }
            // เขียนไฟล์ลงระบบ
            await Bun.write(filePath, image);

            if (config.debugger) {
                console.log('settingGame1 : saved file successfully');
            }

            const settingGamedetail = await prisma.settingGameDetail.findFirst({ where: { SettingGameid: Number(setting) } })
            if (!settingGamedetail) {
                if (config.debugger) {
                    console.log(`settingGame1 : No settingGamedetail ID`);
                }

                const detailCreate = await prisma.settingGameDetail.create({ data: { SettingGameid: Number(setting), url: filePath, position: position, problems: problems } })

                if (detailCreate && config.debugger) {
                    console.log(`settingGame1 : SettingGamedetail Create success`);
                }
            } else {
                await prisma.settingGameDetail.update({
                    where: {
                        SettingGameDetail_id: settingGamedetail.SettingGameDetail_id
                    },
                    data: {
                        url: filePath,
                        problems: problems,
                        position: position
                    }
                })
            }

            return {
                success: true,
                message: "แก้ไข สำเร็จ"
            }
        } catch (error) {
            console.error('settingGame1 : Error fetching ', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาด"
            }
        }
    },
    settingGame23: async ({ body }: { body: { setting: string, image: File, position: string, problems: Array<string> } }) => {
        try {
            if (config.debugger) {
                console.log('settingGame23 : Start!!')
            }

            const { setting, image, position, problems } = body
            if (!image || !(image instanceof File)) {
                if (config.debugger) {
                    console.log(`settingGame23 : No File Image`);
                }

                return {
                    success: false,
                    message: 'ไม่พบไฟล์รูปภาพ'
                }
            }
            const SettingGame = await prisma.settingGame.findFirst({ where: { SettingGame_id: Number(setting) } })
            if (!SettingGame) {
                if (config.debugger) {
                    console.log(`settingGame23 : No SettingGame ID`);
                }

                return {
                    success: false,
                    message: 'ไม่ข้อมูลการตั้งค่านี้'
                }
            }
            const fileExtension = image.name.split('.').pop(); // ดึงนามสกุลไฟล์
            const newFileName = `${nanoid()}.${fileExtension}`; // สร้างชื่อใหม่
            const filePath = `public/imagegame/${newFileName}`;
            if (config.debugger) {
                console.log('settingGame23 : saved file', { filePath, originalName: image.name });
            }

            // เขียนไฟล์ลงระบบ
            await Bun.write(filePath, image);

            if (config.debugger) {
                console.log('settingGame23 : saved file successfully');
            }

            const settingGamedetail = await prisma.settingGameDetail.findFirst({ where: { SettingGameid: Number(setting) } })
            if (!settingGamedetail) {
                if (config.debugger) {
                    console.log(`settingGame23 : No settingGamedetail ID`);
                }

                const detailCreate = await prisma.settingGameDetail.create({ data: { SettingGameid: Number(setting), url: filePath, position: position, problems: problems } })

                if (detailCreate && config.debugger) {
                    console.log(`settingGame23 : SettingGamedetail Create success = ${detailCreate}`);
                }
            } else {
                const update = await prisma.settingGameDetail.update({
                    where: {
                        SettingGameDetail_id: settingGamedetail.SettingGameDetail_id
                    },
                    data: {
                        url: filePath,
                        problems: problems,
                        position: position
                    }
                })
                if (update && config.debugger) {
                    console.log(`settingGame23 : SettingGamedetail update success = ${update}`);
                }
            }

            return {
                success: true,
                message: "แก้ไข สำเร็จ"
            }
        } catch (error) {
            console.error('settingGame23 : Error fetching ', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาด"
            }
        }
    },
    settingGame456: async ({ body }: { body: { setting: string, sound: File, position: string, answer: string } }) => {
        try {
            if (config.debugger) {
                console.log('settingGame456 : Start !!!')
            }
            const { setting, sound, position, answer } = body
            if (!setting || !sound || !position || !answer) {
                if (config.debugger) {
                    console.log('settingGame456 : Some information was not found.')
                }
                return {
                    success: false,
                    message: 'ข้อมูลไม่ครบถ้วน'
                }
            }

            const SettingGame = await prisma.settingGame.findFirst({ where: { SettingGame_id: Number(setting) } })
            if (!SettingGame) {
                if (config.debugger) {
                    console.log(`settingGame456 : No SettingGame ID`);
                }

                return {
                    success: false,
                    message: 'ไม่ข้อมูลการตั้งค่านี้'
                }
            }

            const fileExtension = sound.name.split('.').pop(); // ดึงนามสกุลไฟล์
            const newFileName = `${nanoid()}.${fileExtension}`; // สร้างชื่อใหม่
            const filePath = `public/imagegame/${newFileName}`;
            if (config.debugger) {
                console.log('settingGame456 : saved file', { filePath, originalName: sound.name });
            }

            // เขียนไฟล์ลงระบบ
            await Bun.write(filePath, sound);

            if (config.debugger) {
                console.log('settingGame456 : saved file successfully');
            }


            const settingGamedetail = await prisma.settingGameDetail.findFirst({ where: { SettingGameid: Number(setting) } })
            if (!settingGamedetail) {
                if (config.debugger) {
                    console.log(`settingGame456 : No settingGamedetail ID`);
                }

                const detailCreate = await prisma.settingGameDetail.create({ data: { SettingGameid: Number(setting), url: filePath, position: position, answer: answer } })

                if (detailCreate && config.debugger) {
                    console.log(`settingGame456 : SettingGamedetail Create success = ${detailCreate}`);
                }
            } else {
                const update = await prisma.settingGameDetail.update({
                    where: {
                        SettingGameDetail_id: settingGamedetail.SettingGameDetail_id
                    },
                    data: {
                        url: filePath,
                        answer: answer,
                        position: position
                    }
                })
                if (update && config.debugger) {
                    console.log(`settingGame456 : SettingGamedetail update success = ${update}`);
                }
            }

            return {
                success: true,
                message: "แก้ไข สำเร็จ"
            }

        } catch (error) {
            console.error('settingGame456 : Error fetching ', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาด"
            }
        }
    },
    initializeDefaultGameSettings: async () => {
        try {
            await prisma.settingGameDetail.deleteMany()
            await prisma.settingGame.deleteMany()

            // setupgame 2
            const game1 = await prisma.settingGame.create({ data: { name: 'game1', label: 'เกมวาดรูป 6 เหลี่ยม' } })
            const game2 = await prisma.settingGame.create({ data: { name: 'game2', label: 'เกมจับคู่สี' } })
            const game3 = await prisma.settingGame.create({ data: { name: 'game3', label: 'เกมจับคู่ตัวเลข' } })
            const game4 = await prisma.settingGame.create({ data: { name: 'game4', label: 'เกมรูปสัตว์' } })
            const game5 = await prisma.settingGame.create({ data: { name: 'game5', label: 'เกมเสียงสัตว์' } })
            const game6 = await prisma.settingGame.create({ data: { name: 'game6', label: 'เกมเสียงธรรมชาติ' } })


            await prisma.settingGameDetail.createMany({
                data: [
                    {
                        SettingGameid: game1.SettingGame_id,
                        url: '',
                        position: 'Image-Demo'
                    },
                    // --------------------------------------------------
                    // game 2
                    {
                        SettingGameid: game2.SettingGame_id, // พื้นหลัง
                        url: '',
                        position: 'Background-Card'
                    },
                    {
                        SettingGameid: game2.SettingGame_id, // สีหน้าการ์ด
                        url: '',
                        position: 'Color-Card'
                    },
                    // --------------------------------------------------
                    // game 3
                    {
                        SettingGameid: game3.SettingGame_id, // พื้นหลัง
                        url: '',
                        position: 'Background-Card'
                    },
                    {
                        SettingGameid: game3.SettingGame_id, // เลขหน้าการ์ด
                        url: '',
                        position: 'Number-Card'
                    },
                    // --------------------------------------------------
                    //game 4
                    {
                        SettingGameid: game4.SettingGame_id, //ข้อที่ 1
                        url: '',
                        position: 'Point-1'
                    },
                    {
                        SettingGameid: game4.SettingGame_id, //ข้อที่ 2
                        url: '',
                        position: 'Point-2'
                    },
                    {
                        SettingGameid: game4.SettingGame_id, //ข้อที่ 3
                        url: '',
                        position: 'Point-3'
                    },
                    {
                        SettingGameid: game4.SettingGame_id, //ข้อที่ 4
                        url: '',
                        position: 'Point-4'
                    },
                    // --------------------------------------------------
                    // game 5
                    {
                        SettingGameid: game5.SettingGame_id, //ข้อที่ 1
                        url: '',
                        position: 'Point-1'
                    },
                    {
                        SettingGameid: game5.SettingGame_id, //ข้อที่ 2
                        url: '',
                        position: 'Point-2'
                    },
                    {
                        SettingGameid: game5.SettingGame_id, //ข้อที่ 3
                        url: '',
                        position: 'Point-3'
                    },
                    {
                        SettingGameid: game5.SettingGame_id, //ข้อที่ 4
                        url: '',
                        position: 'Point-4'
                    },
                    // --------------------------------------------------
                    // game 6
                    {
                        SettingGameid: game6.SettingGame_id, //ข้อที่ 1
                        url: '',
                        position: 'Point-1'
                    },
                    {
                        SettingGameid: game6.SettingGame_id, //ข้อที่ 2
                        url: '',
                        position: 'Point-2'
                    },
                    {
                        SettingGameid: game6.SettingGame_id, //ข้อที่ 3
                        url: '',
                        position: 'Point-3'
                    }
                ]
            })
            return {
                success: true,
                message: 'Game settings reset and initialized.',
                games: [game1, game2, game3, game4, game5, game6]
            }

        } catch (error) {
            console.error('settingGame456 : Error fetching ', {
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