/*
  Warnings:

  - You are about to drop the column `UploadRequired` on the `milestone` table. All the data in the column will be lost.
  - You are about to drop the column `Temp_Score` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `user_Id` on the `player` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `User_Id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Milestone_Button_CTA` to the `milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Milestone_Link` to the `milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Milestone_reward_message` to the `milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_user_Id_fkey`;

-- DropIndex
DROP INDEX `Player_user_Id_key` ON `player`;

-- AlterTable
ALTER TABLE `milestone` DROP COLUMN `UploadRequired`,
    ADD COLUMN `Milestone_Button_CTA` VARCHAR(191) NOT NULL,
    ADD COLUMN `Milestone_Link` VARCHAR(191) NOT NULL,
    ADD COLUMN `Milestone_reward_message` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `player` DROP COLUMN `Temp_Score`,
    DROP COLUMN `user_Id`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `Password`,
    DROP COLUMN `User_Id`,
    DROP COLUMN `Username`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
