class TreeView extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super()

		const shadow = this.attachShadow({ mode: 'open' })

		const style = document.createElement('style')
		style.innerHTML = `
			h1 { color: blue; }
		`

		const content = document.createElement('div')
		content.innerHTML = `
			<h1>tree view</h1>
		`
		shadow.appendChild(style)
		shadow.appendChild(content)
	}
	foo() {
		console.log('I am:', this)
		return 'foo'
	}
}

window.customElements.define('tree-view', TreeView)

console.log('registered')


const ele = document.querySelector('tree-view')
console.log(ele, ele.foo())