import { Interactor } from "../models/interactor.use-case";
import { DisplayType } from "../models/list.entity";
import { Todo } from "../models/todo.entity";

interface DisplayTypeButton {
  type: DisplayType
  text: string
  checked: boolean
}

interface ViewModel {
  todos: Todo[]
  menu: {
    message: string
    displayTypeButtons: DisplayTypeButton[]
  }
}

class Presenter {
  private subscribers: ((vm: ViewModel) => any)[] = []

  constructor(interactor: Interactor) {
    interactor.subscribe((todos, type) => this.convertTodosToViewModel(todos, type))
  }

  public subscribe(subscriber: (vm: ViewModel) => any) {
    this.subscribers.push(subscriber)
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== subscriber)
    }
  }

  private publish(vm: ViewModel) {
    this.subscribers.forEach((sub) => sub(vm))
  }

  private convertTodosToViewModel(todos: Todo[], type: DisplayType) {
    const viewModel = { 
      todos, 
      menu: { 
        message: `${todos.length} items left`,  
        displayTypeButtons: [
          { type: DisplayType.ALL, text: 'All', checked: type === DisplayType.ALL },
          { type: DisplayType.ACTIVE, text: 'Active', checked: type === DisplayType.ACTIVE },
          { type: DisplayType.COMPLETED, text: 'Completed', checked: type === DisplayType.COMPLETED },
        ]
      },
    }; 
    this.publish(viewModel)
  }
}

export { Presenter, ViewModel }