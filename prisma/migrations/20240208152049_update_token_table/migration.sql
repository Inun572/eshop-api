/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expire_at` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokens` ADD COLUMN `expire_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tokens_token_key` ON `tokens`(`token`);
