/*
  Warnings:

  - You are about to drop the column `Status` on the `Conversation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SEEN', 'NOT_SEEN');

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "Status";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "status" "MessageStatus" NOT NULL DEFAULT 'NOT_SEEN';

-- DropEnum
DROP TYPE "ConversationType";

-- DropEnum
DROP TYPE "RequestStatus";
