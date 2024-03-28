import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdatePatient1711620107789 implements MigrationInterface {
  name = "UpdatePatient1711620107789"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `UPDATE "patient" SET "created_at" = now() , "updated_at" = now()`,
    )
    await queryRunner.query(
      `ALTER TYPE "public"."cure_state_enum" RENAME TO "cure_state_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."cure_state_enum" AS ENUM('En cours', 'Prévu', 'Terminée')`,
    )
    await queryRunner.query(
      `ALTER TABLE "cure" ALTER COLUMN "state" TYPE varchar(255)`,
    )
    await queryRunner.query(
      `UPDATE "cure" SET "state" = 'Prévu' WHERE "state" = 'En prévu'`,
    )
    await queryRunner.query(
      `ALTER TABLE "cure" ALTER COLUMN "state" TYPE "public"."cure_state_enum" USING "state"::"text"::"public"."cure_state_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."cure_state_enum_old"`)
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "UQ_7718db6fa138d6d895ecd107c03" UNIQUE ("DMI")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "UQ_7718db6fa138d6d895ecd107c03"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."cure_state_enum_old" AS ENUM('En cours', 'En prévu', 'Terminée')`,
    )
    await queryRunner.query(
      `ALTER TABLE "cure" ALTER COLUMN "state" TYPE "public"."cure_state_enum_old" USING "state"::"text"::"public"."cure_state_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."cure_state_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."cure_state_enum_old" RENAME TO "cure_state_enum"`,
    )
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "created_at"`)
  }
}
