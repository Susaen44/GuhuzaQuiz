/*
  Warnings:

  - A unique constraint covering the columns `[UnlockingLevel]` on the table `milestone` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_Level_Id_fkey`;

-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_Milestone_Id_fkey`;

-- CreateTable
CREATE TABLE `Reward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `requiredLevel` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `milestone_UnlockingLevel_key` ON `milestone`(`UnlockingLevel`);

-- AddForeignKey
ALTER TABLE `player` ADD CONSTRAINT `player_Level_Id_fkey` FOREIGN KEY (`Level_Id`) REFERENCES `level`(`Level_Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player` ADD CONSTRAINT `player_Milestone_Id_fkey` FOREIGN KEY (`Milestone_Id`) REFERENCES `milestone`(`Milestone_Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `player` RENAME INDEX `Player_Level_Id_fkey` TO `player_Level_Id_idx`;

-- RenameIndex
ALTER TABLE `player` RENAME INDEX `Player_Milestone_Id_fkey` TO `player_Milestone_Id_idx`;
