/*
  Warnings:

  - A unique constraint covering the columns `[OrgNumber]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Organization` ADD COLUMN `OrgNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Organization_OrgNumber_key` ON `Organization`(`OrgNumber`);
