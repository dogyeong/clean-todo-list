import { Todo } from "./todo.entity";

describe('Todo 엔티티는', () => {
  it('생성될 때 유니크한 id가 지정되어야 한다', () => {
    const todoA = new Todo()
    const todoB = new Todo()

    expect(todoA.id).not.toEqual(todoB.id)
  })

  it('생성될 때 생성된 시간을 타임스탬프 형식으로 저장해야 한다', () => {
    let now = new Date('2022-01-01')
    
    jest.useFakeTimers().setSystemTime(now)
    
    expect(new Todo().createdAt).toEqual(now.getTime())

    now = new Date('2022-12-20')

    jest.setSystemTime(now)

    expect(new Todo().createdAt).toEqual(now.getTime())
  })

  it('생성될 때 입력받은 내용을 저장해야 한다', () => {
    expect(new Todo('잠자기').content).toEqual('잠자기')
    expect(new Todo('일어나기').content).toEqual('일어나기')
  })

  it('완료여부는 기본값 false, 변경할 수 있어야 한다', () => {
    const todo = new Todo()

    expect(todo.completed).toBe(false)
    
    todo.completed = true

    expect(todo.completed).toBe(true)
  })

  it('삭제여부는 기본값 false, 변경할 수 있어야 한다', () => {
    const todo = new Todo()

    expect(todo.deleted).toBe(false)
    
    todo.deleted = true

    expect(todo.deleted).toBe(true)
  })
})