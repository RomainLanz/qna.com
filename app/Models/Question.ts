import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Room from 'App/Models/Room'
import Vote from 'App/Models/Vote'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public text: string

  @column()
  public status: 'answered' | 'pinned' | 'deleted'

  @column()
  public roomId: string

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>

  @hasMany(() => Vote)
  public votes: HasMany<typeof Vote>
}
