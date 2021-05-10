import { controller, target } from '@github/catalyst'

@controller
class LikeButtonElement extends HTMLElement {
  @target form: HTMLFormElement
  @target vote: HTMLSpanElement

  public connectedCallback() {
    console.log(this.form)
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const url = this.form.getAttribute('action')
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
      }).then((r) => r.json())

      console.log(response)
    })
  }
}
