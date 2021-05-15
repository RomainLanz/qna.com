import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import StoreQuestionValidator from 'App/Validators/StoreQuestionValidator'

export default class QuestionsController {
  public async store({ params, request, response, view }: HttpContextContract) {
    const payload = await request.validate(StoreQuestionValidator)

    const room = await Room.findOrFail(params.room_id)
    const question = await room.related('questions').create({ text: payload.question })
    await question.related('votes').create({
      ip: request.ip(),
    })

    if (request.ajax()) {
      await question.load('votes')
      return view.render('partials/question', { room, question })
    }

    return response.redirect().back()
  }
}
