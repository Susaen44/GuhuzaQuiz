/*
  Warnings:

  - You are about to drop the column `createdAt` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `player` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `player_email_key` ON `player`;

-- AlterTable
ALTER TABLE `player` DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `password`;
