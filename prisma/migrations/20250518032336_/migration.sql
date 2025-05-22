/*
  Warnings:

  - You are about to drop the column `roleId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_roleId_fkey`;

-- DropIndex
DROP INDEX `Admin_roleId_fkey` ON `Admin`;

-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `roleId`,
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Role`;
