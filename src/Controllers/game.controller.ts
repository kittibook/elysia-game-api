import { Prisma, PrismaClient } from '@prisma/client'
import { Game } from '../Models/Game.model'
import { nanoid } from 'nanoid';
import { config } from '../Config/config';

const prisma = new PrismaClient()
export default {
    gameSave: async ({ body }: { body: { game: Game } }) => {
        try {
            const { game } = body
            const { dataSet, name, age, disease, score, time, position, gamedetail } = game
            const { game1, game2, game3, game4, game5, game6 } = gamedetail
            const userPosition = await prisma.position.create({ data: { latitude: position.latitude, longitude: position.longitude } })
            const user = await prisma.user.create({
                data: {
                    name: name,
                    age: age,
                    disease: disease,
                    DatasetId: dataSet,
                    Positionid: userPosition.id,
                    time: time,
                    score: score.toString()

                }
            })

            const gameCreate = await prisma.game.createMany({
                data: [
                    {
                        UserId: user.id,
                        name: game1.name,
                        problems: Prisma.JsonNull,
                        detail: game1.detail,
                        score: game1.score,
                        time: game1.time.toString()
                    },

                    {
                        UserId: user.id,
                        name: game2.name,
                        problems: game2.problems,
                        detail: game2.detail,
                        score: game2.score,
                        time: game2.time.toString()
                    },

                    {
                        UserId: user.id,
                        name: game3.name,
                        problems: game3.problems,
                        detail: game3.detail,
                        score: game3.score,
                        time: game3.time.toString()
                    },

                    {
                        UserId: user.id,
                        name: game4.name,
                        problems: Prisma.JsonNull,
                        detail: game4.detailproblems,
                        score: game4.score,
                        time: game4.time.toString()
                    },


                    {
                        UserId: user.id,
                        name: game5.name,
                        problems: Prisma.JsonNull,
                        detail: game5.detailproblems,
                        score: game5.score,
                        time: game5.time.toString()
                    },

                    {
                        UserId: user.id,
                        name: game6.name,
                        problems: Prisma.JsonNull,
                        detail: game6.detailproblems,
                        score: game6.score,
                        time: game6.time.toString()
                    },

                ]
            })

            return {
                success: true,
            }



        } catch (error) {
            console.error(error)
        }
    },
    getDataSet: async () => {
        try {
            const dataSet = await prisma.dataset.findMany()
            if (!dataSet) return { success: false, dataSet: [], message: "ไม่พบข้อมูล" }
            return {
                success: true,
                dataSet: dataSet,
                message: "ดึงข้อมูลสำเร็จ"
            }
        } catch (error) {

        }
    },
    getDataUser: async () => {
        try {
            const dataSet = await prisma.user.findMany({
                include: {
                    Game: true,
                    Position: true,
                    Dataset: true
                }
            })
            if (!dataSet) return { success: false, dataSet: [], message: "ไม่พบข้อมูล" }
            return {
                success: true,
                dataSet: dataSet,
                message: "ดึงข้อมูลสำเร็จ"
            }
        } catch (error) {

        }
    },
    Checkimage: async ({ body }: { body: { file: File } }) => {
        try {
            const { file } = body
            if (!file || !(file instanceof File)) {
                return { error: 'No valid file uploaded' };
            }
            // เปลี่ยนชื่อไฟล์ใหม่
            const fileExtension = file.name.split('.').pop(); // ดึงนามสกุลไฟล์
            const newFileName = `${nanoid()}.${fileExtension}`; // สร้างชื่อใหม่
            const filePath = `public/image/${newFileName}`;

            // เขียนไฟล์ลงระบบ
            await Bun.write(filePath, file);

            const formData = new FormData();
            formData.append('image', file, newFileName);
            const point  = [ 0, 1 ,2]
            const response = await fetch(config.urlAI, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const res = await response.json()
                return {
                    success : false,
                    point : point[res.predictedClass],
                    label : res.predictedLabel,
                    perfect : res.similarity.perfect,
                    url : filePath
                }
            } else {
                return {
                    success : false,
                    message : "ตรวจสอบไม่สำเร็จ",
                    url : filePath
                }
            }

        } catch (error) {

        }
    },
}