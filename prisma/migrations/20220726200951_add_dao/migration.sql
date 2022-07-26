-- CreateTable
CREATE TABLE "voter" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dao_id" TEXT NOT NULL,
    "total_votes" INTEGER NOT NULL DEFAULT 0,
    "successful_votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "voter_pkey" PRIMARY KEY ("id","dao_id")
);

-- CreateTable
CREATE TABLE "holder" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dao_id" TEXT NOT NULL,
    "amount" BIGINT NOT NULL DEFAULT 0,
    "decimals" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "holder_pkey" PRIMARY KEY ("id","dao_id")
);

-- CreateTable
CREATE TABLE "dao" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "symbol" TEXT NOT NULL,
    "display_name" TEXT,
    "website" TEXT,
    "twitter" TEXT,
    "logo_url" TEXT,
    "community_token_id" TEXT,
    "program_id" TEXT NOT NULL,

    CONSTRAINT "dao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "voter" ADD CONSTRAINT "voter_dao_id_fkey" FOREIGN KEY ("dao_id") REFERENCES "dao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holder" ADD CONSTRAINT "holder_dao_id_fkey" FOREIGN KEY ("dao_id") REFERENCES "dao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
