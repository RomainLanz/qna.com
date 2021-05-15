import '../css/app.css'
import 'alpinejs'

window.Adonis = {}

window.Adonis.QuestionPage = () => ({
  // State
  question: null,
  hasQuestion: false,

  // Handlers
  async saveQuestion() {
    const action = this.$refs.form.getAttribute('action')

    this.hasQuestion = true

    const html = await fetch(action, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'xmlhttprequest',
      },
      method: 'POST',
      body: JSON.stringify({ question: this.question }),
    }).then((r) => r.text())

    this.question = null
    this.$refs.questionList.insertAdjacentHTML('beforeend', html)
  },
})

window.Adonis.LikeButton = () => ({
  async like() {
    const action = this.$refs.form.getAttribute('action')

    const voteCount = await fetch(action, {
      headers: {
        Accept: 'application/json',
      },
      method: 'POST',
    }).then((r) => r.text())

    this.$refs.voteCount.innerText = voteCount
    this.$el.dataset.voted = this.$el.dataset.voted !== 'true'
  },
})
