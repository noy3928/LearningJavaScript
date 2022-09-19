# Forwarding Refs

- 필요한 상황 : 버튼이나 input처럼 어플 전반에 걸쳐 사용되는 컴포넌트에 ref를 전달해야하는 경우

### 사용방법 :

```javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
))

// 이제 DOM 버튼으로 ref를 작접 받을 수 있습니다.
const ref = React.createRef()
<FancyButton ref={ref}>Click me!</FancyButton>
```

위 코드에서 일어나는 일 :

1. We create a React ref by calling React.createRef and assign it to a ref variable.
2. We pass our ref down to <FancyButton ref={ref}> by specifying it as a JSX attribute.
3. React passes the ref to the (props, ref) => ... function inside forwardRef as a second argument.
4. We forward this ref argument down to <button ref={ref}> by specifying it as a JSX attribute.
5. When the ref is attached, ref.current will point to the <button> DOM node.

### 주의 :

- ref를 넘기고 싶으면 무조건 forwardRef를 사용해야한다. 이외에는 ref를 props로 넘길 수 없다.

## 고차컴포넌트에서 forwardRef 사용하기

```javascript
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps)
      console.log("new props:", this.props)
    }

    render() {
      const { forwardedRef, ...rest } = this.props

      // 사용자 정의 prop "forwardedRef"를 ref로 할당합니다.
      return <Component ref={forwardedRef} {...rest} />
    }
  }

  // React.forwardRef에서 제공하는 두 번째 파라미터 "ref"에 주의해주세요.
  // 가령 "forwardedRef"같은 일반 prop으로 LogProps에 전달할 수 있습니다.
  // 그 다음 Component에 연결할 수 있습니다.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />
  })
}
```

<br>

## devtools에 이름 표시하기

```javascript
function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />
  }

  // DevTools에서 이 컴포넌트에 조금 더 유용한 표시 이름을 지정하세요.
  // 예, "ForwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name
  forwardRef.displayName = `logProps(${name})`

  return React.forwardRef(forwardRef)
}
```
