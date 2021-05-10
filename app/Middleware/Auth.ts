import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class Auth {
  public async handle(
    { params, request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const room = await Room.findOrFail(params.room_id ?? params.id)
    const secrets = request.cookie('secrets', []) as string[]
    const { secret } = request.qs()

    if (secret) {
      secrets.push(secret)
      response.cookie('secrets', secrets)
    }

    if (!secrets.includes(room.secret)) {
      return response.redirect().back()
    }

    await next()
  }
}
