import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Votes extends BaseSchema {
  protected tableName = 'votes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.timestamps(true)
      table.string('ip')
      table.uuid('question_id')

      table.foreign('question_id').references('id').inTable('questions').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
