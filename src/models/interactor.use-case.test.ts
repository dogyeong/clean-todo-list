import { Interactor } from "./interactor.use-case";
import { DisplayType } from "./list.entity";
import { Todo } from "./todo.entity";

describe('인터랙터는', () => {
  let interactor: Interactor;

  beforeEach(() => {
    interactor = new Interactor()
  })

  it('기본 displayType은 ALL이여야 한다', () => {
    expect(interactor.displayType).toBe(DisplayType.ALL)
  })

  it('입력받은 문자열을 내용으로 하는 투두를 추가할 수 있어야 한다', () => {
    const firstContent = '테스트!@' 
    const secondContent = '!@#ASDZXC'
    
    interactor.addTodo(firstContent)
    interactor.addTodo(secondContent)

    expect(interactor.getTodos().find((todo) => todo.content === firstContent)).toBeInstanceOf(Todo)
    expect(interactor.getTodos().find((todo) => todo.content === secondContent)).toBeInstanceOf(Todo)
  })

  it('투두리스트를 조회할 수 있어야 한다', () => {
    const firstContent = '테스트!@' 
    const secondContent = '!@#ASDZXC'
    
    interactor.addTodo(firstContent)
    interactor.addTodo(secondContent)

    expect(interactor.getTodos())
  })

  it('투두 완료 상태를 변경하고 노출타입을 변경해서 노출타입에 맞는 투두만 반환할 수 있어야 한다', () => {
    const firstContent = 'aaa111'
    const secondContent = 'bbb222'
    const thirdContent = 'ccc333'

    interactor.addTodo(firstContent)
    interactor.addTodo(secondContent)
    interactor.addTodo(thirdContent)


    const activeTodo = interactor.getTodos().find(todo => todo.content === firstContent)!
    const completedTodo = interactor.getTodos().find(todo => todo.content === secondContent)!
    const deletedTodo = interactor.getTodos().find(todo => todo.content === thirdContent)!

    completedTodo.completed = true
    deletedTodo.deleted = true

    // 기본: ALL상태인지 테스트
    let todos = interactor.getTodos()

    expect(todos.length).toBe(2)
    expect(todos).toContain(activeTodo)
    expect(todos).toContain(completedTodo)

    // DisplayType.COMPLETED 로 변경
    interactor.changeDisplayType(DisplayType.COMPLETED)

    todos = interactor.getTodos()

    expect(todos.length).toBe(1)
    expect(todos).toContain(completedTodo)
    
    // DisplayType.ACTIVE 로 변경
    interactor.changeDisplayType(DisplayType.ACTIVE)

    todos = interactor.getTodos()

    expect(todos.length).toBe(1)
    expect(todos).toContain(activeTodo)
  })

  it('투두를 삭제할 수 있어야 한다', () => {
    const firstContent = 'aa!!'
    const secondContent = 'bb@@'

    interactor.addTodo(firstContent)
    interactor.addTodo(secondContent)

    const firstTodo = interactor.getTodos().find((todo) => todo.content === firstContent)!

    interactor.deleteTodo(firstTodo.id)

    const remainingTodos = interactor.getTodos()

    expect(remainingTodos.length).toBe(1)
    expect(remainingTodos[0].content).toBe(secondContent)
  })
});