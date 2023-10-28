import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sliders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('image_url',255).notNullable();

      table.string('file_path',255).notNullable();
      table.timestamps(true,true);
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
