import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')


      table.string('store_name',50).notNullable();
      table.string('store_description',255).notNullable();
      table.string('public_id',255).notNullable();
      table.string('secure_url',255).notNullable();

      table.timestamps(true,true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
