import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name',255).notNullable();

      table.double('price').unsigned().notNullable();

      table.string('description',255).notNullable();

      table.timestamps(true,true);

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
