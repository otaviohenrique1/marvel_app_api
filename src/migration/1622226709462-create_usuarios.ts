import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsuarios1622226709462 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'usuarios',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'nome',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'senha',
            type: 'varchar'
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuarios');
  }
}
