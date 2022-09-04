# Uncontrolled Components

form 데이터가 DOM 자체로 관리되는 컴포넌트를 비제어 컴포넌트라고 부른다.

- 비제어 컴포넌트를 작성하기 위해서, ref를 사용할 수 있다. form으로 부터.

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.input = React.createRef()
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.input.current.value)
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

- 비제어 컴포넌트는 DOM안에서 단일한 출처를 유지하기 때문에, 리액트와 리액트가 아닌 코드를 합치는 것이 종종 쉽다.

### 기본 값

```javascript
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

- 컴포넌트가 마운트 된 이후에 defaultValue 값을 변경시켜도 DOM의 값이 업데이트 되지 않을 것이다.
- 비제어 컴포넌트에서는 초깃값을 지정한 후 이후의 업데이트는 제어하지 않는 것이 좋다.
  => 왜??

<br>

## 파일 입력 태그

파일 태그는 항상 사용자만이 값을 설정할 수 있기 때문에 항상 비제어 컴포넌트이다.

다음 코드는 파일에 접근하기 위해 DOM에 접근하는 Ref를 만드는 방법을 보여주고 있다.

```javascript
class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }
  handleSubmit(event) {
    event.preventDefault()
    alert(`Selected file - ${this.fileInput.current.files[0].name}`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

ReactDOM.render(<FileInput />, document.getElementById("root"))
```

Q : 비제어 컴포넌트를 사용해야하는 상황은 언제인가?
Q : 비제어 컴포넌트는 무엇인가?
=> form 내부의 데이터가 state로 관리되고 있지 않은 컴포넌트를 비제어 컴포넌트라고 부르는가?
