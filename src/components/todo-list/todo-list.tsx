import { Component, Prop, h, State, Watch, Method, Event, EventEmitter } from '@stencil/core'

export interface TodoItem {
	desc: string,
	done: boolean
}

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @Prop() header = 'Default Title'

  @Prop() list: TodoItem[] = []

  @State() internalList: TodoItem[] = []

  @State() inputVal = ''

  @Watch('internalList')
  @Watch('inputVal')
  watchStateHandler(newVal, oldVal, propName) {
    console.log(`oldVal of ${propName} is`, oldVal)
    console.log(`newVal of ${propName} is`, newVal)
  }

  @Event() todoCompleted: EventEmitter<TodoItem>
  @Event() todoAdded: EventEmitter<TodoItem>

  handleInputChange(e) {
    this.inputVal = e.target.value
  }

  handleInputEnter(e) {
    if (e.keyCode === 13 && this.inputVal) {
      // press enter
      this.internalList = [{ desc: this.inputVal, done: false }, ...this.internalList]
			this.todoAdded.emit(this.internalList[0])
      this.inputVal = ''
    }
  }

  toggleDone(targetIdx: number) {
    if (targetIdx >= 0) {
      const nList = this.internalList.slice()
      nList[targetIdx] = {
        ...nList[targetIdx],
        done: !nList[targetIdx].done,
      }

			this.todoCompleted.emit(nList[targetIdx])
      this.internalList = nList
    }
  }

  removeItem(targetIdx: number) {
    if (targetIdx >= 0) {
      this.internalList = this.internalList.filter((_, idx) => idx !== targetIdx)
    }
  }

  connectedCallback() {
    this.internalList = this.list?.length
      ? this.list.slice()
      : [
          { desc: 'Get up', done: true },
          { desc: 'Go to work', done: true },
          { desc: 'Go home', done: false },
        ]
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputEnter = this.handleInputEnter.bind(this)
    this.toggleDone = this.toggleDone.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  @Method()
  async addItem(desc: string) {
    this.internalList = [{ desc, done: false }, ...this.internalList]
    return this.internalList
  }
  render() {
    return (
      <div class="list-wrapper">
        <div class="header">
          <h1>{this.header}</h1>

          <input type="text" value={this.inputVal} onInput={this.handleInputChange} onKeyPress={this.handleInputEnter} placeholder="Is there anything todo ?" />
        </div>

        <ul>
          {this.internalList.map((i, idx) => {
            return (
              <li onClick={() => this.toggleDone(idx)}>
                <p class={{ done: i.done }}>
                  {idx + 1}. {i.desc}
                </p>

                <button
                  onClick={e => {
                    e.stopPropagation()
                    this.removeItem(idx)
                  }}
                >
                  X
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}