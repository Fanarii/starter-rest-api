/*
  Warnings:

  - You are about to drop the column `orderId` on the `menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `Menu_orderId_fkey`;

-- AlterTable
ALTER TABLE `menu` DROP COLUMN `orderId`,
    ADD COLUMN `order_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
