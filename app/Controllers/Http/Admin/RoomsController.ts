import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
  public async show({ params, view }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)

    await room.load('questions', (query) => query.preload('votes'))

    return view.render('admin/rooms/show', { room })
  }
}
