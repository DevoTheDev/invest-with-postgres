import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1729516800002 implements MigrationInterface {
  name = 'UpdateUserTable1729516800002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD id SERIAL
    `);
    await queryRunner.query(`
      UPDATE "user"
      SET id = nextval('user_id_seq')
      WHERE id IS NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD CONSTRAINT user_pkey PRIMARY KEY (id)
    `);
    await queryRunner.query(`
      ALTER TABLE profiles
      DROP CONSTRAINT profiles_user_id_fkey,
      ALTER COLUMN user_id TYPE INTEGER,
      ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id)
    `);
    await queryRunner.query(`
      UPDATE profiles
      SET user_id = (SELECT id FROM "user" WHERE _id = profiles.user_id::VARCHAR)
      WHERE EXISTS (SELECT 1 FROM "user" WHERE _id = profiles.user_id::VARCHAR)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE profiles
      DROP CONSTRAINT profiles_user_id_fkey,
      ALTER COLUMN user_id TYPE VARCHAR,
      ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(_id)
    `);
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP CONSTRAINT user_pkey,
      DROP COLUMN id
    `);
  }
}