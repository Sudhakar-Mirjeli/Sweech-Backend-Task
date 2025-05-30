/*
  Warnings:

  - You are about to drop the column `ip` on the `LoginRecord` table. All the data in the column will be lost.
  - Added the required column `ipAddress` to the `LoginRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoginRecord" DROP COLUMN "ip",
ADD COLUMN     "ipAddress" TEXT NOT NULL;
