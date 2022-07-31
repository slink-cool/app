/*
  Warnings:

  - You are about to drop the column `successful_votes` on the `voter` table. All the data in the column will be lost.
  - You are about to drop the column `total_votes` on the `voter` table. All the data in the column will be lost.
  - You are about to drop the `holder` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `display_name` on table `dao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `community_token_id` on table `dao` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "holder" DROP CONSTRAINT "holder_dao_id_fkey";

-- AlterTable
ALTER TABLE "dao" ADD COLUMN     "first_voting_at" TIMESTAMP(3),
ADD COLUMN     "nft_token_id" TEXT,
ADD COLUMN     "proposals_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "voters_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "votes_count" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "display_name" SET NOT NULL,
ALTER COLUMN "community_token_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "voter" DROP COLUMN "successful_votes",
DROP COLUMN "total_votes",
ADD COLUMN     "votes_count" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "holder";

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dao_id" TEXT NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id","dao_id")
);

-- CreateTable
CREATE TABLE "deployer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deployer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "salary" TEXT,
    "location" TEXT NOT NULL,
    "tags" TEXT[],
    "description_url" TEXT NOT NULL,
    "logo_base64" TEXT,
    "is_remote" BOOLEAN NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_buildspace" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token_id" INTEGER NOT NULL,
    "owner_eth_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "course_title" TEXT NOT NULL,

    CONSTRAINT "nft_buildspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_developer_dao" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token_id" INTEGER NOT NULL,
    "owner_eth_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_base64" TEXT NOT NULL,

    CONSTRAINT "nft_developer_dao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "member_id_idx" ON "member" USING HASH ("id");

-- CreateIndex
CREATE INDEX "job_tags_idx" ON "job" USING GIN ("tags");

-- CreateIndex
CREATE INDEX "nft_buildspace_owner_eth_id_idx" ON "nft_buildspace" USING HASH ("owner_eth_id");

-- CreateIndex
CREATE INDEX "nft_developer_dao_owner_eth_id_idx" ON "nft_developer_dao" USING HASH ("owner_eth_id");

-- CreateIndex
CREATE INDEX "voter_id_idx" ON "voter" USING HASH ("id");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_dao_id_fkey" FOREIGN KEY ("dao_id") REFERENCES "dao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
