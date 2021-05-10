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
    } else {
      await question.related('votes').create({ ip: request.ip() })
    }

    switch (request.accepts(['html', 'json'])) {
      case 'json':
        await question.load('votes')
        return question.votes.length
      case 'html':
      default:
        return response.redirect().back()
    }
  }
}
