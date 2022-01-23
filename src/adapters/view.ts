import { Presenter, ViewModel } from "./presenter";

class View {
  constructor(private readonly root:HTMLElement, presenter: Presenter) {
    presenter.subscribe((vm) => this.render(vm))
  }

  public render({ todos, menu }: ViewModel) {
    const inputSection = `
      <section class="input">
        <input placeholder="What needs to be done?" />
      </section>
    `
    const listSection = todos.length 
      ? `
          <section class="list">
            <ul>
              ${todos
                .map(
                  ({ id, content, completed }) => `
                    <li>
                      <span data-id="${id}" class="${completed ? 'completed' : ''} item">
                        ${content}
                      </span>
                      <button data-id="${id}" class="del">X</button>
                    </li>
                  `
                )
                .join('')
              }
            </ul>
          </section>
        `
      : ''
    const menuSection = `
      <section class="menu">
        <div>${menu.message}</div>
        <div>
          ${menu.displayTypeButtons
            .map(
              ({ text, checked, type }) => `
                <button data-type="${type}" class="${checked ? 'checked' : ''} btn">
                  ${text}
                </button>
              `
            )
            .join('')
          }
        </div>
      </section>
    ` 

    this.root.innerHTML = `
      ${inputSection}
      ${listSection}
      ${menuSection}
    `
  }
}

export { View }