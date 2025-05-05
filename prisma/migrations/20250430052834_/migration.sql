/*
  Warnings:

  - Added the required column `UserId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Game` ADD COLUMN `UserId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
