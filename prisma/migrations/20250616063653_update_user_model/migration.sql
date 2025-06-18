/*
  Warnings:

  - You are about to drop the column `isSubscribed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `whatsappMobile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isSubscribed",
DROP COLUMN "refreshToken",
DROP COLUMN "whatsappMobile",
ADD COLUMN     "cover_url" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_subscribed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "whatsapp_no" TEXT NOT NULL DEFAULT '';
