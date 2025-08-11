-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'OWNER', 'MANAGER', 'CLIENT');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."enterprise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE INDEX "user_enterprise_id_index" ON "public"."user"("enterprise_id");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
