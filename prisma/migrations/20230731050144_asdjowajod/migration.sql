/*
  Warnings:

  - You are about to drop the column `Table` on the `order` table. All the data in the column will be lost.
  - Added the required column `meja` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `Table`,
    ADD COLUMN `meja` VARCHAR(191) NOT NULL;
