let routes = {}
let templates = {}

const app_div = document.querySelector("#app")

function home() {
  let div = document.createElement("div")
  let link = document.createElement("a")

  link.href = "#/about"
  link.innerText = "About"

  div.innerHTML = "<h1>Home</h1>"
  div.appendChild(link)

  app_div.appendChild(div)
}

function about() {
  let div = document.createElement("div")
  let link = document.createElement("a")
  link.href = "#/"
  link.innerText = "Home"

  div.innerHTML = "<h1>About</h1>"
  div.appendChild(link)

  app_div.appendChild(div)
}

/**
 *
 * @param {string} path - template에 매핑되어야 할 path
 * @param {string | function} template - 렌더링되어야 할 template
 * @returns
 */

function route(path, template) {
  if (typeof template === "function") {
    return (routes[path] = template)
  } else if (typeof template === "string") {
    return (routes[path] = templates[template])
  } else {
    return
  }
}

/**
 *
 * @param {string} name - template의 이름
 * @param {*} templateFunction - dom을 만들 함수
 * @returns
 */

function template(name, templateFunction) {
  return (templates[name] = templateFunction)
}

template("home", function () {
  home()
})
template("about", function () {
  about()
})

route("/", "home")
route("/about", "about")

function resolveRoute(route) {
  try {
    return routes[route]
  } catch (e) {
    throw new Error(`Route ${route} not found`)
  }
}

function router(evt) {
  let url = window.location.hash.slice(1) || "/"
  console.log("url", url)
  let route = resolveRoute(url)

  route()
}

window.addEventListener("load", router)
window.addEventListener("hashchange", router)
