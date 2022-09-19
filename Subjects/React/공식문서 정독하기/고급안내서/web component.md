# Web Component

웹 컴포넌트와 리액트 각각의 목적 :  
웹컴포넌트 - 재사용할 수 있는 컴포넌트에 강한 캡슐화를 제공  
리액트 - 데이터와 DOM을 동기화활 수 있는 선언적 라이브러리를 제공

리액트에서 웹컴포넌트를 사용할 수 있고,  
웹컴포넌트에서 리액트를 사용할 수 있다.

```javascript
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span")
    this.attachShadow({ mode: "open" }).appendChild(mountPoint)

    const name = this.getAttribute("name")
    const url = "https://www.google.com/search?q=" + encodeURIComponent(name)
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint)
  }
}
customElements.define("x-search", XSearch)
```
