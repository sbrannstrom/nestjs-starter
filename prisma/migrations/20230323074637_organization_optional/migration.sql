-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_organizationId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `organizationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
