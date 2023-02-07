import { Component, Prop, h, Event, EventEmitter } from '@stencil/core'

export interface TreeNode {
  label: string
  children?: TreeNode[]
	[key: string]: any
}

@Component({
  tag: 'tree-view',
  styleUrl: 'tree-view.css',
  shadow: true,
})
export class TreeView {
  @Prop() data: TreeNode[] = []
  @Prop() expanded = false

  @Event() toggleNode: EventEmitter<{node: TreeNode, expand: boolean }>

  connectedCallback() {
    // this.data = [
    // 	{
    // 		label: 'grandpa',
    // 		children: [
    // 			{
    // 				label: 'father',
    // 				children: [
    // 					{
    // 						label: 'brother1'
    // 					},
    // 					{
    // 						label: 'sister1'
    // 					}
    // 				]
    // 			},
    // 			{
    // 				label: 'mother',
    // 				children: [
    // 					{
    // 						label: 'brother2'
    // 					},
    // 					{
    // 						label: 'sister2'
    // 					}
    // 				]
    // 			},
    // 		]
    // 	}
    // ]
  }

  render() {
    function renderNode(data: TreeNode[], expanded = false) {
      const childNodes = data.map(i => {
        const { label, children } = i
        return children?.length ? (
          <li>
            <details open={expanded}>
              <summary>{label}</summary>
              {renderNode(children, expanded)}
            </details>
          </li>
        ) : (
          <li>{label}</li>
        )
      })
      return <ul class="tree">{childNodes}</ul>
    }
    return renderNode(this.data, this.expanded)
  }
}
