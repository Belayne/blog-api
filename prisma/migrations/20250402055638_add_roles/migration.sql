-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Owner', 'Guest');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'Guest';
