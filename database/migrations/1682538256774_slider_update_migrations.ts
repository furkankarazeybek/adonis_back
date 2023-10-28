import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sliders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {


      table.integer('slider_order').notNullable().unique();

      table.string("slider_seo",255).notNullable();

      table.renameColumn('image_url', 'image_web_url');
      table.renameColumn('file_path', 'image_web_file_path');

      table.string("image_mobile_url",255).notNullable();
      table.string("image_mobile_file_path",255).notNullable();

    })
  }
}
