const generateRandomId = () => (Math.random() * 1000000).toString(32).replace('.', '')

export class Todo {
  constructor(
    public readonly content = '',
    public readonly id: string = generateRandomId(),
    public readonly createdAt: number = Date.now(),
    public completed: boolean = false,
    public deleted: boolean = false,
  ) {}
}