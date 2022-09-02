- jsx 엘리먼트는 React.createElement(component, props, ...children)를 호출하기 위한 synthetic sugar이다.

```javascript
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>
  }
}

ReactDOM.render(<Hello toWhat="World" />, document.getElementById("root"))
```

이 코드는 아래와 같이 컴파일 될 수 있다.

```javascript
class Hello extends React.Component {
  render() {
    return React.createElement("div", null, `Hello ${this.props.toWhat}`)
  }
}

ReactDOM.render(
  React.createElement(Hello, { toWhat: "World" }, null),
  document.getElementById("root")
)
```

변수에 할당해서 사용하는 방법

```javascript
const e = React.createElement
ReactDOM.render(e("div", null, "Hello World"), document.getElementById("root"))
```
