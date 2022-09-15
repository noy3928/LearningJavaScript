function Router() {
  this.routes = new Map()
  this.mode = "hash"
  this.app = null
}

Router.prototype.changeMode = function (option) {
  if (option === "hash") {
    this.mode = option
  } else if (option === "history") {
    this.mode = option
  } else {
    throw new Error("Invalid router mode")
  }
  return this.mode
}

Router.prototype.initApp = function (id) {
  this.app = document.getElementById(id)
  return this
}

Router.prototype.add = function (path, template) {
  this.routes.set(path, template)
  return this.routes
}

Router.prototype.resolveRoute = function (path) {
  return this.routes.has(path)
}

Router.prototype.render = function (path) {
  if (!this.app) throw new Error("Please initialize app first")

  if (this.resolveRoute(path)) {
    const template = this.routes.get(path)
    this.app.innerHTML = template
  } else {
    this.app.innerHTML = "<h1>404 PAGE</h1>"
  }
}

Router.prototype.load = function () {
  window.addEventListener("load", () => {
    const path = window.location.hash.slice(1) || "/"
    this.render(path)
  })
}

Router.prototype.listen = function () {
  if (this.mode === "hash") {
    window.addEventListener("hashchange", () => {
      const path = window.location.hash.slice(1)
      this.render(path)
    })
  } else {
    console.log("history mode")
  }
}

Router.prototype.flush = function () {
  this.routes = new Map()
  this.mode = "hash"
  this.app = null
}

const home = "<h1>THIS IS HOME PAGE</h1>"
const about = "<h1>THIS IS ABOUT PAGE</h1>"

const router = new Router()
router.initApp("app")
router.add("/", home)
router.add("/about", about)
router.load()
router.listen()
