# UseState 구현하기

```javascript
;<div id="app"></div>

function useState(initState) {
  let state = initState // state를 정의한다.
  const setState = newState => {
    state = newState // 새로운 state를 할당한다.
    render() // render를 실행한다.
  }
  return [state, setState]
}

function Counter() {
  const [count, setCount] = useState(1)
  window.increment = () => setCount(count + 1)

  return `
        <div>
            <strong>count${count}</strong>
            <button onclick="increment()">증가</button>
        </div>
    `
}

function render() {
  const $app = document.querySelector("#app")
  $app.innerHTML = Counter()
}
```

useState를 실행하면 내부에 state를 정의하고,  
setState를 실행하면 내부에 선언된 state를 변경할 것이다.  
즉, 함수가 실행될 때마다 결국 state의 값은 InitState로 초기화될 것이다.
이 때문에 state에는 항상 1이 들어가 있는 상태가 될 것이다.

## 값이 같을 경우 렌더링 방지하기

```javascript
let currentStateKey = 0 // useState가 실행된 횟수
const states = [] // state를 보관할 배열

function useState(initState) {
  const key = currentStateKey
  if (state.length === key) {
    states.push(initState)
  }

  const state = states[key]
  const setState = newState => {
    if (JSON.stringify(newState) === JSON.stringify(state)) return

    //기존 값과 다른 경우에만 값을 변경하고 render()를 실행한다.
    states[key] = newState
    render()
  }

  currentStateKey += 1
  return [state, setState]
}
```

<br>

## setState가 동시에 2번 실행되었을 때, 효율적으로 렌더링 하기 - debounce 사용

```javascript
let count = 0
const debounce = (callback, timer = 0) => {
  let currentCallbackTimer = -1

  return () => {
    count += 1

    clearTimeout(currentCallbackTimer)
    currentCallbackTimer = setTimeout(callback, timer)
  }
}
const 야옹 = debounce(() => console.log("야옹" + count), 100)
```

[참고자료 : https://www.the-guild.dev/blog/react-hooks-system]
