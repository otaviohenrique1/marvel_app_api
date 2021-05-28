import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createFavoritos1622226712061 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'favoritos',
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
              name: 'user_id',
              type: 'integer'
            },
            {
              name: 'item_id',
              type: 'integer'
            },
            {
              name: 'name',
              type: 'varchar'
            },
            {
              name: 'favorite',
              type: 'boolean'
            },
            {
              name: 'category',
              type: 'varchar'
            },
          ],
        }
      )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favoritos');
  }
}
