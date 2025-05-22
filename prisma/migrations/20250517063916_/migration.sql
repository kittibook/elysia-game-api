/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Action` table. All the data in the column will be lost.
  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Dataset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Dataset` table. All the data in the column will be lost.
  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Game` table. All the data in the column will be lost.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Position` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `SettingGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SettingGame` table. All the data in the column will be lost.
  - The primary key for the `SettingGameDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SettingGameDetail` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `Action_id` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Admin_id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Dataset_id` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Game_id` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Position_id` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Role_id` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SettingGame_id` to the `SettingGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SettingGameDetail_id` to the `SettingGameDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `User_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Action` DROP FOREIGN KEY `Action_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `Dataset` DROP FOREIGN KEY `Dataset_Positionid_fkey`;

-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `SettingGameDetail` DROP FOREIGN KEY `SettingGameDetail_SettingGameid_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_DatasetId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_Positionid_fkey`;

-- DropIndex
DROP INDEX `Action_adminId_fkey` ON `Action`;

-- DropIndex
DROP INDEX `Admin_roleId_fkey` ON `Admin`;

-- DropIndex
DROP INDEX `Dataset_Positionid_fkey` ON `Dataset`;

-- DropIndex
DROP INDEX `Game_UserId_fkey` ON `Game`;

-- DropIndex
DROP INDEX `SettingGameDetail_SettingGameid_fkey` ON `SettingGameDetail`;

-- DropIndex
DROP INDEX `User_DatasetId_fkey` ON `User`;

-- DropIndex
DROP INDEX `User_Positionid_fkey` ON `User`;

-- AlterTable
ALTER TABLE `Action` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `Action_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Action_id`);

-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `Admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Admin_id`);

-- AlterTable
ALTER TABLE `Dataset` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `Dataset_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Dataset_id`);

-- AlterTable
ALTER TABLE `Game` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `Game_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Game_id`);

-- AlterTable
ALTER TABLE `Position` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `Position_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Position_id`);

-- AlterTable
ALTER TABLE `Role` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `Role_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Role_id`);

-- AlterTable
ALTER TABLE `SettingGame` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `SettingGame_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`SettingGame_id`);

-- AlterTable
ALTER TABLE `SettingGameDetail` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `SettingGameDetail_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`SettingGameDetail_id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `User_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`User_id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_DatasetId_fkey` FOREIGN KEY (`DatasetId`) REFERENCES `Dataset`(`Dataset_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_Positionid_fkey` FOREIGN KEY (`Positionid`) REFERENCES `Position`(`Position_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dataset` ADD CONSTRAINT `Dataset_Positionid_fkey` FOREIGN KEY (`Positionid`) REFERENCES `Position`(`Position_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`User_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`Role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SettingGameDetail` ADD CONSTRAINT `SettingGameDetail_SettingGameid_fkey` FOREIGN KEY (`SettingGameid`) REFERENCES `SettingGame`(`SettingGame_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Action` ADD CONSTRAINT `Action_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`Admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
