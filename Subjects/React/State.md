# State

- state는 관찰되고 있는 녀석이다. 이 사실을 기억하는 것이 중요하다. an observable. 그리고 리액트는 이 녀석이 변화된 것을 감지하고 렌더링을 일으킨다. 이 역할을 해주는 친구가 setState이다.

- State allows us to manage changing data in an application. It's defined as an **object** where we define key-value pairs specifying various data we want to track in the application.

- Never ever directly update/mutate state in React, as it's a bad practice and it will cause issues in your application. Also, your component will not be re-rendered on state change if you make a direct state change.

## setState가 비동기적으로 처리되는 이유 :

- This means that even though we called setState to increment the counter value by 1, it does not happen immediately. This is because when we call the setState function, the entire component gets re-rendered – so React needs to check what all needs to be changed using the Virtual DOM algorithm and then perform various checks for an efficient update of the UI.

- setState가 비동기적으로 처리되는 이유는 한 컴포넌트 안에서 여러 state가 변경되었을 경우에, 그것이 변화될 때마다 동기적으로 처리해주면 한 컴포넌트안에서 수없이 많은 렌더링이 일어나게 될 것이다. 때문에 한번에 state를 쭉 모았다가 처리하는 방식으로 이루어진다. - batch 처리.

- useState의 내부적으로 확인해보면, debounce가 적용되어 있다. 그리고 debounce는 setTimeout을 사용하므로 이것은 eventLoop의 관찰을 받는다고 할 수 있다. eventLoop는 콜스택이 비어있는 것을 확인한 후에 실행을 시켜주기 때문에 자바스크립트의 실행이 끝나면 그 변화된 값이 적용될 것이다.

---

[참고자료 : https://www.freecodecamp.org/news/what-is-state-in-react-explained-with-examples/]
