# Render Props

```javascript
class MouseTracker extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>
          The current mouse position is ({this.state.x}, {this.state.y})
        </p>
      </div>
    )
  }
}
```

마우스의 움직임을 추적하는 코드이다.  
여기서 우리의 질문은 이런 행동을 어떻게 다른 컴포넌트에서도 재사용할 수 있을까? 이다.

위의 코드를 리펙토링해보자.

```javascript
class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  render(){
      return(
          <div style={{height: '100vh'} onMouseMove={this.handleMouseMove}}>
          <p>The current mouse position is({this.state.x}, {this.state.y})</p>
          </div>
      )
  }
}

class MouseTracker extends React.Component {
    render(){
        return (
            <>
            <h1>Move the mouse around!</h1>
            <Mouse/>
            </h1>
        )
    }
}
```

이제 <Mouse/> 컴포넌트는 마우스 움직임을 듣는 모든 이벤트를 듣는 모든 행위들에 대해서 캡슐화 했다. 하지만 아직 재사용하지는 못하는 상황이다.

예를 들어서 고양이 컴포넌트가 있고,  
그 고양이가 마우스를 따라다니게 만들려고 한다고 생각해보자.  
그 고양이는 x,y 값이 필요하다.

```javascript
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse
    return (
      <img
        src="./cat.jpg"
        style={{ position: "absolute", left: mouse.x, top: mouse.y }}
      />
    )
  }
}

class MouseTracker extends React.Component{
    render(){
        return (
            <div>
                <h1>Move the mouse around!</h1>
                <MouseWithCat/>
            </div>
        )
    }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove(event) {
    this.setState({ x: event.clientX, y: event.clientY })
  }

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        <Cat mouse={this.state}>
      </div>
    )
  }
}

```

이렇게 캡슐화한 것은 특정 케이스에서는 이용이 가능하지만,  
하지만 아직 재사용가능하도록 완전히 캡슐화하지는 않은 상태이다.  
이제 언제든지 이 기능을 다른 케이스에서도 사용하려고 하면,  
또 다른 마우스 추적 컴포넌트를 만들어야 하는 것이다.

이 지점에서 render prop 이 들어온다.  
무엇을 렌더링할지 동적으로 지정할 수 있는 그런 함수를 넘겨주는 prop을 만듦으로써  
이런 문제점들을 해결할 수 있다.

```javascript
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse
    return (
      <img
        src="/cat.jpg"
        style={{ position: "absolute", left: mouse.x, top: mouse.y }}
      />
    )
  }
}

class Mouse extends React.Component {
    constructor(props){
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.state = {x : 0, y : 0}
    }

    handleMouseMove(event){
        this.setState({
            x : event.clientX,
            y : event.clientY
        })
    }

    render(){
        return(
            <div style={{height:'100vh'} onMouseMove={this.handleMouseMove}}>
            {this.props.render(this.state)}
            </div>
        )
    }
}

class MouseTracker extends React.Component{
    render(){
        return(
            <div>
                <h1>Move the mouse around!</h1>
                <Mouse render={mouse => (<Cat mouse={mouse}/>)}>
            </div>
        )
    }
}
```

이제 동적으로 Mouse에 무엇을 렌더링할지를 정할 수 있게 되었다.  
조금 더 구체적으로 말하자면,  
render prop은 컴포넌트가 무엇을 렌더링할 지 알기 위해서 사용하는 함수 prop이다.

이런 기술은 로직을 공유하는 것을 매우 쉽게 만들어준다.  
마우스를 추적하는 로직을 사용하기 위해서, Mouse 컴포넌트를 렌더링하고  
render prop에 무엇을 렌더링할지를 말해주기만 하면 된다.

<br>

### Using Props other than render

단순히 이 기술의 이름이 render prop이라고 해서,  
무조건 prop의 이름을 render라고 해야하는 것은 아니다.  
사실, 컴포넌트가 무엇을 렌더링할 지 알려주는 함수를 받는 모든 prop을 기술적으로 'render prop'이라고 부른다.

이렇게 chilren으로 prop의 이름을 지정할 수도 있다.

```javascript
<Mouse
  children={mouse => (
    <p>
      The mouse position is {mouse.x}, {mouse.y}
    </p>
  )}
/>
```

그리고 꼭 어트리뷰트로 지정해줘야만 하는것도 아니라는 사실을 기억하자.  
아래와 같이 곧바로 이용하는 방법도 있다.

```javascript
<Mouse>
  {mouse => (
    <p>
      The mouse position is {mouse.x}, {mouse.y}
    </p>
  )}
</Mouse>
```

<br>

## Caveats

render prop을 사용하는 것은 React.PureComponent를 사용하는 것의 장점과 맞바꾸는 것일수도 있다.  
만약 render 메서드 안에서 함수를 만드려고 하는 상황이라면.  
왜냐하면 얕은 prop 비교는 새로운 props에 대해서 항상 false를 반환하기 때문에,  
이 경우 각각의 render는 render prop에 대해서 새로운 value를 만들 것이다.

예를 들어, 만약 Mouse가 React.PureComponent 로 확장되어 만들어졌다면,  
아래와 코드가 같을 것이다.

```javascript
class Mouse extends React.PureComponent {
  // Same implementation as above...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          This is bad! The value of the `render` prop will
          be different on each render.
        */}
        <Mouse render={mouse => <Cat mouse={mouse} />} />
      </div>
    )
  }
}
```

이 예시에서, 매번 <MouseTracker>를 렌더할 때마다,  
이것은 새로운 함수를 만들 것이다 Mouse의 render prop을 위해서.

이런 문제를 해결하고 싶다면, 종종 prop을 instance 메서드로 만드는 방법도 있다.

```javascript
class MouseTracker extends React.Component {
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    )
  }
}
```
