import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'abouts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('header',50).notNullable();

      table.string('content',500).notNullable();

      table.string('video_file',255).notNullable();
      table.timestamps(true,true);
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
