import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from '@lukeed/uuid'
import Question from 'App/Models/Question'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public secret: string

  @hasMany(() => Question)
  public questions: HasMany<typeof Question>

  @beforeCreate()
  public static generateSecret(room: Room) {
    room.secret = uuid()
  }
}
