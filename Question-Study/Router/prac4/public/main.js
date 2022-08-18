window.onload = () => {
  let root = document.getElementById("app")

  let Router = function (name, routes) {
    return {
      name,
      routes,
    }
  }

  let routerInstance = new Router("routerInstance", [
    { path: "/", name: "Root" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ])

  let currentPath = window.location.pathname

  if (currentPath === "/") {
    root.innerHTML = "You are on Home page"
  } else {
    let route = routerInstance.routes.filter(r => r.path === currentPath)[0]
    if (route) {
      root.innerHTML = `You are on the ${route.name} path`
    } else {
      root.innerHTML = `This route is not defined`
    }
  }
  // method to navigate
  let navigate = e => {
    let route = e.target.attributes[0].value

    // redirect to the router instance
    let routeInfo = routerInstance.routes.filter(r => r.path === route)[0]
    if (!routeInfo) {
      window.history.pushState({}, "", "error")
      root.innerHTML = `This route is not Defined`
    } else {
      window.history.pushState({}, "", routeInfo.path)
      root.innerHTML = `You are on the ${routeInfo.name} path`
    }

    console.log(window.history)
  }

  let definedRoutes = Array.from(document.querySelectorAll("[router-link]"))
  definedRoutes.forEach(route => {
    route.addEventListener("click", navigate, false)
  })
}
