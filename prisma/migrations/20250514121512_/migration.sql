-- CreateTable
CREATE TABLE `SettingGame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SettingGameDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SettingGameid` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `problems` JSON NULL,
    `position` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SettingGameDetail` ADD CONSTRAINT `SettingGameDetail_SettingGameid_fkey` FOREIGN KEY (`SettingGameid`) REFERENCES `SettingGame`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
