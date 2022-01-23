import { List, DisplayType } from "./list.entity"
import { Todo } from "./todo.entity"

type Subscriber = (todos: Todo[], type: DisplayType) => any
interface InteractorInterface {
  displayType: DisplayType
  subscribe: (subscriber: Subscriber) => () => void
  addTodo: (content: string) => Todo[]
  getTodos: () => Todo[]
  activateTodo: (id: string) => Todo[]
  completeTodo: (id: string) => Todo[]
  deleteTodo: (id: string) => Todo[]
  changeDisplayType: (type: DisplayType) => Todo[]
}

class Interactor implements InteractorInterface {
  private list = new List()
  private subscribers: Subscriber[] = []

  get displayType() {
    return this.list.displayType
  }

  public subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber)
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== subscriber)
    }
  }

  private publish() {
    const todos = this.getTodos()
    this.subscribers.forEach((sub) => sub(todos, this.displayType))
  }

  public addTodo(content: string) {
    this.list.todos.push(new Todo(content))
    this.publish()
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
    this.publish()
    return this.getTodos()
  }

  public completeTodo(id: string) {
    const todo = this.list.todos.find((todo) => todo.id === id)
    if (todo) todo.completed = true
    this.publish()
    return this.getTodos()
  }

  public deleteTodo(id: string) {
    const todo = this.list.todos.find((todo) => todo.id === id)
    if (todo) todo.deleted = true
    this.publish()
    return this.getTodos()
  }

  public changeDisplayType(type: DisplayType) {
    this.list.displayType = type
    this.publish()
    return this.getTodos()
  }
}

export { Interactor, InteractorInterface }