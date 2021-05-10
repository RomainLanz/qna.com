/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').redirect('rooms.create')
Route.resource('rooms', 'RoomsController').only(['store', 'create', 'show'])
Route.resource('rooms.questions', 'QuestionsController').only(['store'])
Route.resource('rooms.questions.vote', 'VotesController').only(['store'])

Route.group(() => {
  Route.resource('rooms', 'Admin/RoomsController').only(['show'])
  Route.resource('rooms.questions', 'Admin/QuestionsController').only(['edit', 'update'])
  Route.put('rooms/:room_id/questions/:id/text', 'Admin/QuestionsController.updateText').as(
    'rooms.updateText'
  )
})
  .middleware(['auth'])
  .prefix('admin')
  .as('admin')
