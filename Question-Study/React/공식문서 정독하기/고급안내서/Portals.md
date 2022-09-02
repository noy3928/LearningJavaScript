# Portals

- portal은 dom 계층 구조 바깥의 부모 요소에 자식 요소를 렌더링 할 수 있는 최선의 방법이다.

```javascript
ReactDOM.createPortal(child, container)
```

첫번째 인자는 렌더링 가능한 자식이어야한다. (element, string, fragment)  
두번째 인자는 Dom element이어야 한다.

<br>

## 사용법

일반적으로 element를 컴포넌트의 렌더 메서드에 반환하면,
그것은 가까운 부모 노드의 자식노드로써 DOM에 마운트 될 것이다.

```javascript
render() {
  // React mounts a new div and renders the children into it
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

하지만, 종종 다른 장소에 있는 DOM에 자식 요소를 주입하는 것이 유용할 때가 있다.

```javascript
render(){
    return ReactDOM.createPortal(this.props.children, domNode)
}
```

portal의 전형적인 사용사례는 부모 컴포넌트가 overflow : hidden이나 z-index 스타일 요소를 가지고 있지만,  
자식 요소의 이 컨테이너 바깥에 표시할 필요가 있을때이다.  
예를 들면, dialogs나 hovercards, 그리고 tooltips 같은 것들이다.

> portal을 사용할 때는 키보드 포커싱을 관리하는 것이 매우 중요하다.
> [키보드 포커싱](https://reactjs.org/docs/accessibility.html#programmatically-managing-focus)

<br>

## Event Bubbling Through Portals

포탈이 돔트리 어느 곳에 위치할 수 있음에도 불구하고,  
이것은 일반적인 리액트 자식 컴포넌트와 동일하게 동작한다.  
context와 같은 기능들도 마찬가지로 동작한다. 자식 요소가 portal이던지 아니던지 상관없이.  
왜냐하면 portal이 DOM트리와 관계없이 여전히 리액트 트리에 존재하기 때문이다.

이것은 이벤트 버블링에도 적용되는 사항이다.  
포탈 안쪽에서부터 발생된 이벤트는 이것의 조상에게 이벤트를 전파할 것이다.  
이런 요소들이 DOM tree에서 조상요소가 아닐지라도.

아래의 HTML구조를 생각해보자.

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

#app-root 안에 있는 부모 컴포넌트는 형제 노드인 modal root 컴포넌트 안에서 포착되지 않았던 전파된 이벤트를 포착할 수 있다.

그 방법을 보자.

```javascript
const appRoot = document.getElementById("app-root")
const modalRoot = document.getElementById("modal-root")

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement("div")
  }

  componentDidMount() {
    /*
        portal element는 Modal의 자식요소가 마운트되고나서 DOM tree에 주입될 것이다.  
        이것이 의미하는 바는 자식요소가 어디에도 연결되지 않은 DOM 노드로 마운트된다는 것이다.  
        만약에 마운트된 즉시 자식 컴포넌트가 DOM tree에 붙여지도록 요구된다면, 예를 들어서 DOM 노드를 계산해야하거나 , 자식들 중에서 autoFocus를 사용해야하는 경우라면, Modal에 state를 추가하고 Modal이 DOM트리에 삽입되어 있을 때만 자식을 렌더링 해주어야 한다. 
      */
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicks: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    /*
      자식안에 있는 버튼이 클릭되면 이 함수가 호출될 것이다. 
      그리고 부모의 state를 업데이트 할 것이다.  
      DOM tree에서 button이 직접적인 자식요소가 아님에도 불구하고 그것이 가능하다. 
      */
    this.setState(state => ({
      clicks: state.clicks + 1,
    }))
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools to observe that the button is not a child
          of the div with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    )
  }
}

function Child() {
  /*

    */
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  )
}

const root = ReactDOM.createRoot(appRoot)
root.render(<Parent />)
```

부모 컴포넌트 안에 있었던 포탈로부터 이벤트 버블링을 잡아내는 것은  
유연한 추상화의 개발을 허용해준다. portal에 의존하지 않으면서.

예를 들어서, Modal 컴포넌트를 렌더할 때, 이것이 portal을 사용했든지 안했든지,  
부모는 이벤트를 잡아낼 수 있다.
