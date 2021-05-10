import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import UpdateQuestionValidator from 'App/Validators/Admin/UpdateQuestionValidator'
import UpdateTextQuestionValidator from 'App/Validators/Admin/UpdateTextQuestionValidator'

export default class QuestionsController {
  public async edit({ params, view }: HttpContextContract) {
    const question = await Question.query()
      .whereHas('room', (query) => {
        query.where('id', params.room_id)
      })
      .where('id', params.id)
      .preload('room')
      .firstOrFail()

    return view.render('admin/questions/edit', { question })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateQuestionValidator)

    const question = await Question.query()
      .whereHas('room', (query) => {
        query.where('id', params.room_id)
      })
      .where('id', params.id)
      .preload('room')
      .firstOrFail()

    await question.merge(payload).save()

    return response.redirect().withQs().back()
  }

  public async updateText({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateTextQuestionValidator)

    const question = await Question.query()
      .whereHas('room', (query) => {
        query.where('id', params.room_id)
      })
      .where('id', params.id)
      .preload('room')
      .firstOrFail()

    await question.merge(payload).save()

    return response.redirect().toRoute('Admin/RoomsController.show', { id: question.room.id })
  }
}
