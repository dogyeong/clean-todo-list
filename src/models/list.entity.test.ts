import { DisplayType, List } from "./list.entity"

describe('List 엔티티는', () => {
  it('Todo를 저장할 배열을 가지고 있어야 한다', () => {
    const list = new List()

    expect(Array.isArray(list.todos)).toBe(true)
  })

  it('노출 조건을 저장할 속성을 가지고 있어야 한다. 기본값은 전체 노출', () => {
    const list = new List()

    expect(list.displayType).toEqual(DisplayType.ALL)
  })

  it('노출 조건은 변경 가능하며, 허용되지 않는 값으로 설정할 경우에는 에러를 발생시켜야 한다', () => {
    const list = new List()

    list.displayType = DisplayType.COMPLETED

    expect(list.displayType).toEqual(DisplayType.COMPLETED)

    const changeWrongDisplayType = () => (list.displayType = 'wrong' as unknown as DisplayType)
    
    expect(changeWrongDisplayType).toThrowError('TODO Entity: Type must be one of DisplayType')
  })
})