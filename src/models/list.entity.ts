import { Todo } from "./todo.entity";

export const enum DisplayType {
  ALL,
  ACTIVE,
  COMPLETED,
}

export class List {
  public readonly todos: Todo[] = []
  private _displayType: DisplayType = DisplayType.ALL

  get displayType() {
    return this._displayType
  }

  set displayType(type: DisplayType) {
    if (type !== DisplayType.ALL && type !== DisplayType.ACTIVE && type !== DisplayType.COMPLETED) {
      throw new Error('TODO Entity: Type must be one of DisplayType')
    }
    this._displayType = type
  }
}