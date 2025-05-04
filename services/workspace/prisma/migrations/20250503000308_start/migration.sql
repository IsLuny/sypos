-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "public_id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspace_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "features" BIGINT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_auth" (
    "userId" TEXT NOT NULL,
    "signInKey" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "users_auth_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "publicId" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "features" BIGINT NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace_config" (
    "workspaceId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "timezone" TEXT NOT NULL DEFAULT 'UTC-03:00/America/Sao_Paulo',
    "logo_url" TEXT,

    CONSTRAINT "workspace_config_pkey" PRIMARY KEY ("workspaceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_userId_key" ON "users_auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_signInKey_key" ON "users_auth"("signInKey");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_id_key" ON "workspaces"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_publicId_key" ON "workspaces"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_config_workspaceId_key" ON "workspace_config"("workspaceId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_auth" ADD CONSTRAINT "users_auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_config" ADD CONSTRAINT "workspace_config_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
