import { StorageInterface } from "../models/interactor.use-case"
import { DisplayType, List } from "../models/list.entity"
import { Todo } from "../models/todo.entity"

const KEY = 'lskey'

const localStorageDriver: StorageInterface = {
  save(list: List) {
    localStorage.setItem(KEY, JSON.stringify(list))
  },
  load() {
    const saved = localStorage.getItem(KEY)

    if (!saved) return null

    const { todos, _displayType } = JSON.parse(saved) as { todos: Todo[]; _displayType: DisplayType }

    const list = new List()

    todos.forEach(({ content, id, createdAt, completed, deleted }) => {  
      list.todos.push(new Todo(content, id, createdAt, completed, deleted))
    })

    list.displayType = _displayType

    return list
  },
}

export { localStorageDriver }