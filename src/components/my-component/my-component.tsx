import { Component, Prop, h, State, Listen } from '@stencil/core'
import { format } from '../../utils/utils'

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string

  /**
   * The middle name
   */
  @Prop() middle: string

  /**
   * The last name
   */
  @Prop() last: string

  @State() isOpen: boolean = true
  @Listen('click', { capture: true })
  clickHandler() {
    this.isOpen = !this.isOpen
  }

  /** input keyword */
  @State() input: string

  @State() curTime: number = Date.now()

  #timer: number
  connectedCallback() {
    this.#timer = window.setInterval(() => {
      this.curTime = Date.now()
    }, 1000)
  }

  disConnectedCallback() {
    if (this.#timer) {
      clearInterval(this.#timer)
    }
  }
  private getText(): string {
    return format(this.first, this.middle, this.last)
  }

  render() {
    const time = new Date(this.curTime).toLocaleDateString()
    return <div class="my-container">Hello, World! I'm {this.getText()} {time} {String(this.isOpen)}</div>
  }
}
