import {MigrationInterface, QueryRunner} from "typeorm";

export class entityUser21637774872923 implements MigrationInterface {
    name = 'entityUser21637774872923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" character varying(128) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" text NOT NULL`);
    }

}
