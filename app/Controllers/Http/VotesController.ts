import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'

export default class VotesController {
  public async store({ params, request, response }: HttpContextContract) {
    const question = await Question.query()
      .whereHas('room', (query) => {
        query.where('id', params.room_id)
      })
      .where('id', params.question_id)
      .firstOrFail()

    const vote = await question.related('votes').query().where('ip', request.ip())

    if (vote.length === 1) {
      await vote[0].delete()

      return response.redirect().back()
    }

    await question.related('votes').create({ ip: request.ip() })

    return response.redirect().back()
  }
}
