import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1695935506462 implements MigrationInterface {
    name = 'sync1695935506462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_role" (
              "user_role_id" SERIAL NOT NULL,
              "role" text NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "UQ_30ddd91a212a9d03669bc1dee74" UNIQUE ("role"),
              CONSTRAINT "PK_77580f3bab637e39a7fdd01a94c" PRIMARY KEY ("user_role_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
              "user_id" SERIAL NOT NULL,
              "last_activity" TIMESTAMP NOT NULL DEFAULT now(),
              "email" text NOT NULL,
              "first_name" text,
              "last_name" text,
              "password" text NOT NULL,
              "user_role_id" integer,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
              CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "topic" (
              "topic_id" SERIAL NOT NULL,
              "topic" text NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "UQ_9fb53a603aa8b4687314f43d744" UNIQUE ("topic"),
              CONSTRAINT "PK_d91aa173b2e6549130633b15a2d" PRIMARY KEY ("topic_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "news" (
              "news_id" SERIAL NOT NULL,
              "date_of_publication" TIMESTAMP NOT NULL,
              "title" text NOT NULL,
              "content" text,
              "user_id" integer,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP,
              CONSTRAINT "PK_313a1b4b0d8af7de07bfb46b6cb" PRIMARY KEY ("news_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "news__topic" (
              "news_id" integer NOT NULL,
              "topic_id" integer NOT NULL,
              CONSTRAINT "PK_ed0dc44f7853de3405d93b88047" PRIMARY KEY ("news_id", "topic_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1edca54b2c61f061e935e62e3f" ON "news__topic" ("news_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_67a4b3f2259f303208c08fad25" ON "news__topic" ("topic_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_078f27c5e6a46cb1ab1b9fd463b" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("user_role_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "news"
            ADD CONSTRAINT "FK_7a806f5e14fced276888eab1a3e" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "news__topic"
            ADD CONSTRAINT "FK_1edca54b2c61f061e935e62e3fe" FOREIGN KEY ("news_id") REFERENCES "news"("news_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "news__topic"
            ADD CONSTRAINT "FK_67a4b3f2259f303208c08fad251" FOREIGN KEY ("topic_id") REFERENCES "topic"("topic_id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "news__topic" DROP CONSTRAINT "FK_67a4b3f2259f303208c08fad251"
        `);
        await queryRunner.query(`
            ALTER TABLE "news__topic" DROP CONSTRAINT "FK_1edca54b2c61f061e935e62e3fe"
        `);
        await queryRunner.query(`
            ALTER TABLE "news" DROP CONSTRAINT "FK_7a806f5e14fced276888eab1a3e"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_078f27c5e6a46cb1ab1b9fd463b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_67a4b3f2259f303208c08fad25"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1edca54b2c61f061e935e62e3f"
        `);
        await queryRunner.query(`
            DROP TABLE "news__topic"
        `);
        await queryRunner.query(`
            DROP TABLE "news"
        `);
        await queryRunner.query(`
            DROP TABLE "topic"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user_role"
        `);
    }

}
