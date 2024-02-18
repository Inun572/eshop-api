/*
  Warnings:

  - You are about to alter the column `total` on the `cart_item` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `cart_item` MODIFY `total` DOUBLE NOT NULL;
