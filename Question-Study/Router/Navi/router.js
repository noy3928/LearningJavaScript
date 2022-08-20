function Router() {
  this.routes = new Map()
  this.mode = "hash"
}

Router.prototype.addRoute = function (path, component) {
  this.routes.set(path, component)
  return this.routes
}

Router.prototype.changeMode = function (option) {
  if (option === "hash") {
    this.mode = "hash"
  } else {
    this.mode = "history"
  }
  return this.mode
}

Router.prototype.listen = function () {
  if (this.mode === "hash") {
    window.addEventListener("hashchange", () => {
      console.log(window.location.hash)
    })
  } else {
    console.log("history mode")
  }
}

const router = new Router()
router.addRoute("#about", "about")
router.listen()
