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
