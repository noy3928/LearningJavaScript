class Router {
  constructor(routes) {
    this.routes = routes
    this._loadInitialRoute()
  }

  loadRoute(...urlSegments) {
    const matchedRoute = this._matchUrlToRoute(urlSegments)

    const url = `/${urlSegments.join("/")}`
    history.pushState({}, "", url)

    const routerOutletElement = document.querySelectorAll(
      "[data-router-outlet]"
    )[0]
    routerOutletElement.innerHTML = matchedRoute.template
  }

  _matchUrlToRoute(urlSegments) {
    // Try and match the URL to a route.
    const matchedRoute = this.routes.find(route => {
      // We assume that the route path always starts with a slash, and so
      // the first item in the segments array  will always be an empty
      // string. Slice the array at index 1 to ignore this empty string.
      const routePathSegments = route.path.split("/").slice(1)

      // If there are different numbers of segments, then the route
      // does not match the URL.
      if (routePathSegments.length !== urlSegments.length) {
        return false
      }

      // If each segment in the url matches the corresponding route path,
      // then the route is matched.
      return routePathSegments.every(
        (routePathSegment, i) => routePathSegment === urlSegments[i]
      )
    })
    return matchedRoute
  }

  _loadInitialRoute() {
    // Figure out the path segments for the route which should load initially.
    const pathnameSplit = window.location.pathname.split("/")
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : ""

    this.loadRoute(...pathSegments)
  }
}
