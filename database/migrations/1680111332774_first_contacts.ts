import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')


      table.string('name_surname',50).notNullable();

      table.string('phone_number',20).notNullable();

      table.string('email',255).notNullable();

      table.string('message',750).notNullable();
      table.timestamps(true,true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
