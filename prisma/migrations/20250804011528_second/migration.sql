-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_enterprise_id_fkey";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "enterprise_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "public"."enterprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
