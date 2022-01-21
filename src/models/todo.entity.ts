let id = 0

export class Todo {
  public readonly id: string
  public readonly createdAt: number
  public completed: boolean
  public deleted: boolean

  constructor(public readonly content = '') {
    this.id = String(id++)
    this.createdAt = Date.now()
    this.completed = false
    this.deleted = false
  }
}