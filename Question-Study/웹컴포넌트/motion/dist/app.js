import { PageComponent } from "./components/page.js"
var App = (function () {
  function App(appRoot) {
    this.page = new PageComponent()
    this.page.attachTo(appRoot)
  }
  return App
})()
export { App }
new App(document.querySelector(".document"))
