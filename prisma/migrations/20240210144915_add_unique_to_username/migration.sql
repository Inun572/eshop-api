/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role_id` INTEGER NOT NULL DEFAULT 3;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
