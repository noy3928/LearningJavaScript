## When should I use Redux?

Not all apps need Redux. It's important to understand the kind of application you're building, the kinds of problems that you need to solve, and what tools can best solve the problems you're facing.

Redux helps you deal with shared state management, but like any tool, it has tradeoffs. It's not designed to be the shortest or fastest way to write code. It's intended to help answer the question "When did a certain slice of state change, and where did the data come from?", with predictable behavior. There are more concepts to learn, and more code to write. It also adds some indirection to your code, and asks you to follow certain restrictions. It's a trade-off between short term and long term productivity.

As Pete Hunt, one of the early contributors to React, says:

> You'll know when you need Flux. If you aren't sure if you need it, you don't need it.

Similarly, Dan Abramov, one of the creators of Redux, says:

> I would like to amend this: don't use Redux until you have problems with vanilla React.

Redux is most useful in cases when:

- You have large amounts of application state that are needed in many places in the app
- The app state is updated frequently
- The logic to update that state may be complex
- The app has a medium or large-sized codebase, and might be worked on by many people
- You need to see how that state is being updated over time

There are also many other tools available that can help solve some of the same problems Redux does: - state management, caching fetched server data, and passing data through the UI.

[참고자료 : https://redux.js.org/faq/general#when-should-i-use-redux]

---

다양한 컴포넌트 사이에 state를 주고받아야 하는 상황 :
Let’s consider a use case involving the authentication status of a user. Your product manager tells you that when a user is logged into an ecommerce store, the navigation bar should display the user’s avatar image, the store should display items nearest to the user’s zip code first, and the newsletter signup form should be hidden. Within a vanilla React architecture, your options are limited for syncing state across each of the components.

그런데 만약 규모가 큰 프로젝트라면, 불필요한 컴포넌트들에게도 데이터가 왔다갔다 할 것이다.
In a large application, this can result in tons of data moving through unrelated components, passed down via props or passed up using callbacks.
