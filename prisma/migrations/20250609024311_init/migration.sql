/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `player` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user`;

-- CreateIndex
CREATE UNIQUE INDEX `player_email_key` ON `player`(`email`);
