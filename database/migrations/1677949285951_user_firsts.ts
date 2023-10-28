import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Roles } from 'App/Core/Utilities/Roles/Roles';

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('first_name',255).notNullable();
      table.string('last_name',255).notNullable();

      table.string('email',255).notNullable();

      table.string('phone',255).notNullable();

      table.string('password',255).notNullable();

      table.enum('role',Object.values(Roles)).notNullable().defaultTo("USER");

      table.timestamps(true,true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
