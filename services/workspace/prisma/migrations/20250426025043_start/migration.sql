/*
  Warnings:

  - Added the required column `created_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "users_auth" (
    "user_id" TEXT NOT NULL,
    "sign_in_key" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "users_auth_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_user_id_key" ON "users_auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_sign_in_key_key" ON "users_auth"("sign_in_key");

-- AddForeignKey
ALTER TABLE "users_auth" ADD CONSTRAINT "users_auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
