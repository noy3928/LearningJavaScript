export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void
}
/**
 * Encapsulate the HTML element creation
 * T는 HTMLElement의 서브 클래스만 가능
 */
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T
  constructor(htmlString: string) {
    const template = document.createElement("template")
    template.innerHTML = htmlString
    this.element = template.content.firstElementChild! as T
  }
  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element)
  }
}
