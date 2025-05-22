import { Prisma, PrismaClient } from '@prisma/client'
import { Game } from '../../Models/Game.model'
import { nanoid } from 'nanoid';
import { config } from '../../Config/config';

const prisma = new PrismaClient()
export default {
    gameSave: async ({ body }: { body: { game: Game } }) => {
        try {
            if (config.debugger) {
                console.log('gameSave: Starting game save process', { body });
            }
            const { game } = body
            if (!game) {
                if (config.debugger) {
                    console.log('gameSave: No game in request body');
                }
                return { success: false, message: 'No game data provided' }
            }
            const { dataSet, name, age, disease, score, time, position, gamedetail } = game

            if (config.debugger) {
                console.log('gameSave: Extracted game data', { dataSet, name, age, disease, score, time });
            }

            const { game1, game2, game3, game4, game5, game6 } = gamedetail

            const userPosition = await prisma.position.create({ data: { latitude: position.latitude, longitude: position.longitude } })

            if (config.debugger) {
                console.log('gameSave: Created position', { positionId: userPosition.Position_id });
            }

            const user = await prisma.user.create({
                data: {
                    name: name,
                    age: age,
                    disease: disease,
                    DatasetId: dataSet,
                    Positionid: userPosition.Position_id,
                    time: time,
                    score: score.toString()

                }
            })

            if (config.debugger) {
                console.log('gameSave: Created user', { userId: user.User_id });
            }

            const gameCreate = await prisma.game.createMany({
                data: [
                    {
                        UserId: user.User_id,
                        name: game1.name,
                        problems: Prisma.JsonNull,
                        detail: game1.detail,
                        score: game1.score,
                        time: game1.time.toString()
                    },

                    {
                        UserId: user.User_id,
                        name: game2.name,
                        problems: game2.problems,
                        detail: game2.detail,
                        score: game2.score,
                        time: game2.time.toString()
                    },

                    {
                        UserId: user.User_id,
                        name: game3.name,
                        problems: game3.problems,
                        detail: game3.detail,
                        score: game3.score,
                        time: game3.time.toString()
                    },

                    {
                        UserId: user.User_id,
                        name: game4.name,
                        problems: Prisma.JsonNull,
                        detail: game4.detailproblems,
                        score: game4.score,
                        time: game4.time.toString()
                    },


                    {
                        UserId: user.User_id,
                        name: game5.name,
                        problems: Prisma.JsonNull,
                        detail: game5.detailproblems,
                        score: game5.score,
                        time: game5.time.toString()
                    },

                    {
                        UserId: user.User_id,
                        name: game6.name,
                        problems: Prisma.JsonNull,
                        detail: game6.detailproblems,
                        score: game6.score,
                        time: game6.time.toString()
                    },

                ]
            })
            if (config.debugger) {
                console.log('gameSave: Created games', { count: gameCreate.count });
            }
            return {
                success: true,
                message: 'Game saved successfully'
            }

        } catch (error) {
            console.error('gameSave: Error saving game', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: 'Failed to save game',
                error: error instanceof Error ? error.message : 'Unknown error'
            }
        }
    },
    getDataSet: async () => {
        try {
            if (config.debugger) {
                console.log('getDataSet: Fetching datasets');
            }
            const dataSet = await prisma.dataset.findMany()
            if (!dataSet) {
                if (config.debugger) {
                    console.log('getDataSet: No datasets found');
                }
                return { success: false, dataSet: [], message: "ไม่พบข้อมูล" }
            }
            if (config.debugger) {
                console.log('getDataSet: Datasets retrieved', { count: dataSet.length });
            }
            return {
                success: true,
                dataSet: dataSet,
                message: "ดึงข้อมูลสำเร็จ"
            }
        } catch (error) {
            console.error('getDataSet: Error fetching datasets', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                dataSet: [],
                message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
            }
        }
    },
    getDataUser: async () => {
        try {
            if (config.debugger) {
                console.log('getDataUser: Fetching user data');
            }
            const dataSet = await prisma.user.findMany({
                include: {
                    Game: true,
                    Position: true,
                    Dataset: true
                }
            })
            if (!dataSet || dataSet.length === 0) {
                if (config.debugger) {
                    console.log('getDataUser: No users found');
                }
                return {
                    success: false,
                    dataSet: [],
                    message: "ไม่พบข้อมูล"
                }
            }

            if (config.debugger) {
                console.log('getDataUser: Users retrieved', { count: dataSet.length });
            }
            return {
                success: true,
                dataSet: dataSet,
                message: "ดึงข้อมูลสำเร็จ"
            }
        } catch (error) {
            console.error('getDataUser: Error fetching users', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                dataSet: [],
                message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
            }
        }
    },
    Checkimage: async ({ body }: { body: { file: File } }) => {
        try {
            if (config.debugger) {
                console.log('Checkimage: Starting image check', { body });
            }
            const { file } = body
            if (!file || !(file instanceof File)) {
                if (config.debugger) {
                    console.log('Checkimage: Invalid file');
                }
                return {
                    success: false,
                    message: 'No valid file uploaded'
                }
            }
            // เปลี่ยนชื่อไฟล์ใหม่
            const fileExtension = file.name.split('.').pop(); // ดึงนามสกุลไฟล์
            const newFileName = `${nanoid()}.${fileExtension}`; // สร้างชื่อใหม่
            const filePath = `public/image/${newFileName}`;
            if (config.debugger) {
                console.log('Checkimage: Saving file', { filePath, originalName: file.name });
            }
            // เขียนไฟล์ลงระบบ
            await Bun.write(filePath, file);

            const formData = new FormData();
            formData.append('image', file, newFileName);
            if (config.debugger) {
                console.log('Checkimage: Sending request to AI service', { url: config.urlAI });
            }
            const point = [0, 1, 2]
            const response = await fetch(config.urlAI, {
                method: 'POST',
                body: formData
            });
            if (config.debugger) {
                console.log('Checkimage: Received AI response', { status: response.status });
            }
            if (response.ok) {

                const res = await response.json()
                if (config.debugger) {
                    console.log('Checkimage: AI processing successful', { predictedClass: res.predictedClass });
                }
                return {
                    success: false,
                    point: point[res.predictedClass],
                    label: res.predictedLabel,
                    perfect: res.similarity.perfect,
                    url: filePath
                }
            } else {
                if (config.debugger) {
                    console.log('Checkimage: AI service request failed', { status: response.status });
                }
                return {
                    success: false,
                    message: "ตรวจสอบไม่สำเร็จ",
                    url: filePath
                }
            }

        } catch (error) {
            console.error('Checkimage: Error processing image', {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            })
            return {
                success: false,
                message: "เกิดข้อผิดพลาดในการตรวจสอบรูปภาพ"
            }
        }
    },
}