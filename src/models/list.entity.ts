import { Todo } from "./todo.entity";

export const enum DisplayType {
  ALL,
  ACTIVE,
  DELETED,
}

export class List {
  public readonly todos: Todo[]
  private _displayType: DisplayType = DisplayType.ALL

  constructor() {
    this.todos = []
  }

  get displayType() {
    return this._displayType
  }

  set displayType(type: DisplayType) {
    if (type !== DisplayType.ALL && type !== DisplayType.ACTIVE && type !== DisplayType.DELETED) {
      throw new Error('type must be one of DisplayType')
    }
    this._displayType = type
  }
}