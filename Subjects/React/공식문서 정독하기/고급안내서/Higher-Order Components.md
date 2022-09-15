# Higher-Order Components

- 이것은 api가 아니다. 하나의 패턴이다.
- 컴포넌트 로직을 재사용하기 위한 패턴이다.
- 고차함수 컴포넌트는 다른 컴포넌트를 가져와 새로운 컴포넌트를 반환하는 함수이다.
- 고차 컴포넌트는 입력된 컴포넌트를 수정하지 않으며 상속을 사용하여 동작을 복사하지도 않는다.
- 오히려 고차 컴포넌트는 원본 컴포넌트를 컨테이너 컴포넌트로 포장(Wrapping)하여 조합(compose)한다.
- 고차 컴포넌트는 사이드 이펙트가 전혀 없는 순수 함수이다.

```javascript
// 이 함수는 컴포넌트를 매개변수로 받고..
function withSubscription(WrappedComponent, selectData) {
  // ...다른 컴포넌트를 반환하는데...
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = {
        data: selectData(DataSource, props),
      }
    }

    componentDidMount() {
      // ... 구독을 담당하고...
      DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange)
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props),
      })
    }

    render() {
      // ... 래핑된 컴포넌트를 새로운 데이터로 랜더링 합니다!
      // 컴포넌트에 추가로 props를 내려주는 것에 주목하세요.
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}
```

```javascript
const CommentListWithSubscription = withSubscription(CommentList, DataSource =>
  DataSource.getComments()
)

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
)
```
