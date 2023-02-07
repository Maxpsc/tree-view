# todo-list



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type         | Default           |
| -------- | --------- | ----------- | ------------ | ----------------- |
| `header` | `header`  |             | `string`     | `'Default Title'` |
| `list`   | --        |             | `TodoItem[]` | `[]`              |


## Events

| Event           | Description | Type                    |
| --------------- | ----------- | ----------------------- |
| `todoAdded`     |             | `CustomEvent<TodoItem>` |
| `todoCompleted` |             | `CustomEvent<TodoItem>` |


## Methods

### `addItem(desc: string) => Promise<TodoItem[]>`



#### Returns

Type: `Promise<TodoItem[]>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
