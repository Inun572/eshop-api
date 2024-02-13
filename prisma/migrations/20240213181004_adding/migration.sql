-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
