import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExerciserTables1729516800001 implements MigrationInterface {
  name = 'CreateExerciserTables1729516800001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE exercisers (
        user_id INTEGER PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES "user"(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE workouts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        date TIMESTAMP NOT NULL,
        exercises TEXT NOT NULL,
        exerciser_id INTEGER NOT NULL,
        FOREIGN KEY (exerciser_id) REFERENCES exercisers(user_id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE workouts`);
    await queryRunner.query(`DROP TABLE exercisers`);
  }
}