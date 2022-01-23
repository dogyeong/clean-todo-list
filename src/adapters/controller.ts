import { Interactor } from "../models/interactor.use-case"
import { DisplayType } from "../models/list.entity"

class Controller {
  private input: string = ''

  constructor(root: HTMLElement, interactor: Interactor) {
    root.addEventListener('keyup', ({ target, key }) => {
      if (!(target instanceof HTMLInputElement)) return
      
      if (key === 'Enter') {
        interactor.addTodo(this.input)
        return
      }
      
      this.input = target.value
    })
    
    root.addEventListener('click', ({ target }) => {
      if (!(target instanceof HTMLElement)) return
      
      if (target.closest('.item')) {
        const item = target.closest('.item') as HTMLLIElement
        const { id } = item.dataset
        const completed = item.classList.contains('completed')

        if (!id) return

        completed ? interactor.activateTodo(id) : interactor.completeTodo(id)
      }

      if (target.closest('.del')) {
        const btn = target.closest('.del') as HTMLButtonElement
        const { id } = btn.dataset

        if (!id) return

        interactor.deleteTodo(id)
      }

      if (target.closest('.btn')) {
        const btn = target.closest('.btn') as HTMLButtonElement
        const { type } = btn.dataset
        const checked = btn.classList.contains('checked')

        if (!type || checked) return

        interactor.changeDisplayType(+type as DisplayType)
      }
    })

    interactor.changeDisplayType(interactor.displayType)
  }
}

export { Controller }