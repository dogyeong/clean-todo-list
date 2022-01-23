import { List, DisplayType } from "./list.entity"
import { Todo } from "./todo.entity"

interface InteractorInterface {
  displayType: DisplayType
  addTodo: (content: string) => Todo[]
  getTodos: () => Todo[]
  activateTodo: (id: string) => Todo[]
  completeTodo: (id: string) => Todo[]
  deleteTodo: (id: string) => Todo[]
  changeDisplayType: (type: DisplayType) => Todo[]
}

class Interactor implements InteractorInterface {
  private list: List

  constructor() {
    this.list = new List()
  }

  get displayType() {
    return this.list.displayType
  }

  public addTodo(content: string) {
    this.list.todos.push(new Todo(content))
    return this.getTodos()
  }

  public getTodos() {
    return this.list.todos.filter(({ completed, deleted }) => {
      if (deleted) return false
      if (this.displayType === DisplayType.ALL) return true  
      if (this.displayType === DisplayType.ACTIVE) return !completed
      if (this.displayType === DisplayType.COMPLETED) return completed
      return false
    })
  }

  public activateTodo(id: string) {
    const todo = this.list.todos.find((todo) => todo.id === id)
    if (todo) todo.completed = false
    return this.getTodos()
  }

  public completeTodo(id: string) {
    const todo = this.list.todos.find((todo) => todo.id === id)
    if (todo) todo.completed = true
    return this.getTodos()
  }

  public deleteTodo(id: string) {
    const todo = this.list.todos.find((todo) => todo.id === id)
    if (todo) todo.deleted = true
    return this.getTodos()
  }

  public changeDisplayType(type: DisplayType) {
    this.list.displayType = type
    return this.getTodos()
  }
}

export { Interactor, InteractorInterface }