# Component

- 컴포넌트는 HTML element를 반환하는 함수다.
- 컴포넌트는 독립적이고 재사용가능한 코드이다.
- 아주 간단하게 정의하자면 다음과 같다. 컴포넌트는 자바스크립트의 클래스나 함수를 통해서 작성하는데, 이것은 properties를 받고, react element를 반환한다. 그리고 그 element를 통해서 화면의 UI를 그리게 된다.

## 컴포넌트의 종류 :

이 컴포넌트는 2가지 종류로 나눠진다.  
함수형과 클래스형.

함수형은 다음과 같은 모습을 하고 있다.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

클래스형은 다음과 같은 모습을 하고 있다.

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

오늘날에는 함수형을 더 많이 사용한다.  
클래스형도 자료를 참고하기 위해서 공부해둘 필요는 있다.

### 함수형 컴포넌트의 특징 :

=> Functional : because they are basically functions

=> Stateless : because they do not hold and/or manage state

=> Presentational : because all they do is output UI elements

---

# Props

- Props are React’s way of making components easily and dynamically customisable.They provide a way of passing properties/data down from one component to another, typically from a parent to a child component (unidirectional dataflow).

- props는 함수의 arguements와 비슷하다.

- props는 객체다.

- An argument (props) is passed to the functional component. Recall that since a single argument is being passed to the arrow function, the parentheses are unnecessary. Passing this argument lets the component know to expect some data to be passed to it (in this case, the name of our app’s user)

### props는 read - only다

- It’s important to note that props are read-only and that a component must never modify the props passed to it.
- 모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.
