# Error Boundaries

- 자바스크립트 에러가 리액트 전체 어플을 중단시키지 않도록 하기 위해 도입된 기술
- 문제가 생긴 컴포넌트 대신에 fallback에 등록해준 컴포넌트를 보여준다.
- 자식 트리에 있는 컴포넌트들에서 에러를 잡아낸다.

### 에러 경계가 잡아주지 않는 에러들

- 이벤트 핸들러
- 비동기적 코드 (예: setTimeout 혹은 requestAnimationFrame 콜백)
- 서버 사이드 렌더링
- 자식에서가 아닌 에러 경계 자체에서 발생하는 에러

### 클래스형에서 에러 바운더리를 사용하는 방법

getDerivedStateFromError나 componentDidCatch를 사용하면 해당 컴포넌트가 에러바운더리가 된다.

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

```javascript
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

<br>

## 이벤트 핸들러

- 이벤트 핸들러에서는 try/catch 구문을 사용할 것
- 이벤트 핸들러는 렌더링 중에 발생하는 것이 아니기 때문에, 이미 리액트가 무엇을 렌더링 해야할지를 알고 있다.
