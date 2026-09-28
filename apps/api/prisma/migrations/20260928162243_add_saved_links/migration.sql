-- CreateEnum
CREATE TYPE "SavedLinkStatus" AS ENUM ('INBOX', 'LIBRARY', 'ARCHIVED');

-- CreateTable
CREATE TABLE "saved_links" (
    "id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "domain" VARCHAR(255) NOT NULL,
    "title" VARCHAR(300),
    "description" VARCHAR(500),
    "image_url" TEXT,
    "status" "SavedLinkStatus" NOT NULL DEFAULT 'INBOX',
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saved_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "saved_links_profile_id_status_created_at_idx" ON "saved_links"("profile_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "saved_links_profile_id_is_favorite_created_at_idx" ON "saved_links"("profile_id", "is_favorite", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "saved_links_profile_id_url_key" ON "saved_links"("profile_id", "url");

-- AddForeignKey
ALTER TABLE "saved_links" ADD CONSTRAINT "saved_links_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
