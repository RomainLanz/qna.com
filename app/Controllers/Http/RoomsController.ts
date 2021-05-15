import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import StoreRoomValidator from 'App/Validators/StoreRoomValidator'

export default class RoomsController {
  public create({ view }: HttpContextContract) {
    return view.render('rooms/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreRoomValidator)

    const room = await Room.create(payload)

    const secrets = request.cookie('secrets', [])
    secrets.push(room.secret)
    response.cookie('secrets', secrets)

    return response.redirect().toRoute('admin.rooms.show', { id: room.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const room = await Room.query()
      .where('id', params.id)
      .preload('questions', (query) => query.preload('votes'))
      .firstOrFail()

    return view.render('rooms/show', { room })
  }
}
