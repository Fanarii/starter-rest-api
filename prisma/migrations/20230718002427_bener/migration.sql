/*
  Warnings:

  - You are about to drop the `_menutoorder` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_menutoorder` DROP FOREIGN KEY `_MenuToOrder_A_fkey`;

-- DropForeignKey
ALTER TABLE `_menutoorder` DROP FOREIGN KEY `_MenuToOrder_B_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_customerId_fkey`;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `orderId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `customerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `orderId` INTEGER NULL;

-- DropTable
DROP TABLE `_menutoorder`;

-- CreateIndex
CREATE UNIQUE INDEX `Order_customerId_key` ON `Order`(`customerId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_orderId_key` ON `User`(`orderId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
