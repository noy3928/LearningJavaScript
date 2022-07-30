# A Deep Dive into React Fiber

https://blog.logrocket.com/deep-dive-react-fiber/

Ever wondered what happens when you call ReactDOM.render(<App />, document.getElementById('root'))? Maybe

We know that ReactDOM builds the DOM tree under the hood and renders the application on the screen. But how does React actually build the DOM tree? And how does it update the tree when the app’s state changes?

In this post, we’ll learn what React Fiber is and how React built the DOM tree until React v15.0.0, the pitfalls of that model, and how the new model from React v16.0.0 to the current version solves these problems.

## What is React Fiber ?

리액트 Fiber는 리액트가 더 빠르고 똑똑하게 동작하게 만들기 위한 내부적인 엔진이다.
The Fiber reconciler는 기존의 리액트 reconciliation 알고리즘의 문제점을 재작성했다.

Fiber는 비동기로 작동되기 때문에, 리액트는 다음과 같은 것들을 할 수 있다 :

- 새로운 업데이트가 들어옴에 따라서 렌더링 작업을 멈추거나, 재시작할 수 있다.
- 이전의 완성된 작업을 재사용하거나, 불필요하면 버릴 수 있다.
- 몇몇 chunks를 버리거나, 중요성에 따라서 작업의 우선순위를 나눌 수 있다.

이런 변화들은 동기적인 stack reconciler의 한계를 해결해줄 수 있었다. 예를 들어 이전에는 item을 더하거나 지울 수 있었다. 하지만 이것은 stack이 비워질 때까지 동작해야 했고, 그런 작업들은 인터럽트 처리될 수가 없었다.

이제 fiber를 제대로 이해하기 위해서 old reconciler에 대해서 이야기해보자 : the old reconciler

## React’s stack reconciler :

Let’s start with our familiar ReactDOM.render(<App />, document.getElementById('root')).

The ReactDOM module passes the <App/ > to the reconciler, but there are two questions here:

1. What does <App /> refer to?
2. What is the reconciler?

## What is <App/> ?

<App /> 은 react element이다. tree를 묘사하고 있는 element.  
리액트 블로그에 따르면, “An element is a plain object describing a component instance or DOM node and its desired properties.” 이렇게 정의내려진다.

다른말로 하면 element는 실제 돔도 아니고 어떤 컴포넌트의 인스턴스도 아니다. 그것들은 단지 리액트에게 자신이 어떤 타입의 element인지, 어떤 props를 가지고 있는지, 자신의 자식들은 누가있는지를 알려줄 뿐이다.

여기에 리액트의 진짜 힘이 있다. 리액트는 실제 돔의 라이프 사이클을 만들고, 렌더링하고 관리하는 모든 복잡한 작업들을 추상화해버렸다. 그리고 개발자들의 삶을 아주 편하게 만들어주었다.

이것이 무엇을 의미하는지 이해하기 위해서 전통적인 방법으로 접근해보자. 객체지향의 패러다임으로

## Object-oriented programing in React :

전통적인 객체지향의 세계에서는, 개발자는 모든 dom 요소들을 초기화하고 그것들의 라이프 사이클을 관리해야 했다.  
예를 들어서, 만약에 간단한 폼과 제출 버튼을 만들려고 한다면, 상태 관리는 여전히 개발자에게 노력을 요구한다.

Let’s assume the Button component has a isSubmitted state variable.
버튼 컴포넌트의 라이프 사이클은 아래 보이는 flow 차트와 같다.  
state는 반드시 앱에 의해서 관리되어야 한다.

![button component](./img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-07-29%20%EC%98%A4%ED%9B%84%204.31.10.png)

플로우 차트의 사이즈와 코드의 줄 수는 state 변수의 갯수가 증가할 수록 급격히 늘어날 것이다.  
그래서 리액트는 이런 문제를 해결하기 위해서 element를 가진다.  
리액트에서는 두 종류의 element가 있다. Dom element와 component element이다.

dom element는 string이다. 예를 들어서, <button class="okButton"> OK </button>. 이런것과 같다.

그리고 component element는 클래스나 함수다. 예를 들어서, <Button className="okButton"> OK </Button> 처럼.

그리고 이 두가지 종류의 element들이 단순히 객체라는 것을 이해하는 것은 중요하다.  
이것들은 단순히 무엇이 화면에 업데이트 되어야 하는지에 대한 묘사라고 할 수 있다.  
이것들이 만들어진다고 해서, 렌더링을 불러일으키거나 하는 것은 아니다.

## What is React reconciliation?

재조정 작업은 리액트가 dom tree를 parse하고 순회하는 것을 쉽게 만들어준다.  
실제 렌더링은 순회가 끝나고 나면 시작된다.

리액트가 클래스나 함수형 컴포넌트를 마주하면,  
리액트는 props에 기반에서 그 컴포넌트에게 어떤 element를 렌더링해야 할지를 물어볼 것이다.

예를 들어서, 만약 App 컴포넌트가 렌더링 된다면, 따라서 리액트는 Form, Button 컴포넌트에게 무엇을 렌더링 시켜줘야 할지를 물을 것이다.

```javascript
<Form>
  <Button>Submit</Button>
</Form>
```

그리고 리액트는 render 함수를 호출할 것이다. 어떤 elements를 렌더링 해야하는지를 알기 위해서.

리액트는 이런 과정들을 반복할 것이다. 모든 컴포넌트에 대해서. 이렇게 dom tag element 요소를 파악하기 위해서 모든 tree를 순회하는 과정을 reconcilation이라고 한다.

이런 reconciliation 작업이 끝나면, 리액트는 Dom tree의 결과물을 알게될 것이다. react-dom같은 renderer는 이렇게 최소화된 변경사항을 적용할 것이다. Dom 노드를 업데이트 하기 위해서. 이것은 당신이 React.Dom.render()나 setState를 사용하면 리액트가 reconciliation 작업을 할 것이라는 말이다.

이제 reconciliation이 무엇인지 알게 되었다.  
이 모델에 어떤 함정이 있는지 알아보자.

## What is the React stack reconciler?

앗 잠시만, 그런데 왜 stack reconciler라고 불리는걸까?  
이것은 stack 자료구조에서부터 출발한 아이디어이다.

그럼 이 stack이 지금까지 우리가 본 것과 어떤 상관이 있을까?  
우리가 봤던 작업들은 재귀적으로 수행되고 있기 때문에 그것은 스택과 관련이 있다.

## What is recursion in React?

To understand why that’s the case, let’s take a simple example and see what happens in the call stack:

```javascript
function fib(n) {
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

fib(10)
```

보다시피 콜스택은 모든 fib호출에 쌓인다. 이 스택들은 함수가 반환하기 전까지 계속 쌓인다. 그리고 반환하면 pop할 것이다.

우리가 봤던 reconciliation 알고리즘은 순수하게 재귀 알고리즘이라고 할 수 있다. 업데이트하면 전체 하위 트리가 즉시 다시 렌더링된다. 이 방법은 잘 작동하지만 몇 가지 제한이 있다.

Andrew Clark notes에 따르면, UI에서는 모든 요소들이 즉시 적용될 필요가 없다.  
사실은 이것은 상당히 낭비적이다. 프레임 드롭을 일으킬 수도 있고, 사용자 경험을 상당히 낮추게 될 것이다.

또한 업데이트 유형마다 우선순위가 다르다. 애니메이션 업데이트는 데이터 저장소의 업데이트보다 빨리 완료되어야 한다.

## Problems with dropped frames

자 금방 언급된 프레임 드롭이란 무엇일까?  
그리고 이것이 왜 재귀적으로 수행될 때 문제가 된다는 것일까?  
이것을 이해하기 위해서,
간단하기 frame rate가 무엇인지 확인해보고, 이것이 왜 사용자 경험적인 측면에서 중요한지도 알아보자.

### What is frame rate?

Frame rate 연속 이미지가 화면에 나타나는 빈도이다. 우리가 컴퓨터 화면에서 보는 모든 것은 눈에 순간적으로 보이는 속도로 화면에서 재생되는 이미지나 프레임으로 구성되어 있다.

이것이 무엇을 의미하는지 이해하려면 컴퓨터 디스플레이는 플립북이고 플립북 페이지는 플립북을 플립할 때 재생되는 프레임이라고 생각하면 된다.

상대적으로, 컴퓨터 디스플레이는 화면에서 장면이 바뀔 때 연속적으로 재생되는 자동 플립북에 불과하다.  
일반적으로 비디오가 사람의 눈에 부드럽고 순간적으로 느껴지려면 비디오가 초당 약 30프레임(FPS)의 속도로 재생되어야 한다.  
요즘 대부분의 장치는 60 FPS, 1/60 = 16.67ms로 화면을 새로 고친다. 즉, 16ms마다 새 프레임이 표시된다.  
만약 react renderer가 화면에 무언가를 그릴 때, 16ms 이상이 걸리면,  
브라우저가 해당 프레임을 삭제하기 때문에 이 숫자는 중요한 것이다.

그러나 실제로는 브라우저가 하우스키핑을 해야 하므로 모든 작업을 10ms 이내에 완료해야 한다.  
이 시간을 지키지 못하면, 프레임률이 떨어지게 되고, 화면이 버벅이게 된다.  
이것은 종종 jank 라고 불리기도 하는데, 사용자 경험에 상당히 부정적인 영향을 미친다.

당연히 단순한 글자가 나오는 화면에서는 문제가 되지 않겠지만, 애니메이션을 화면에 보여주려고 할 경우에는  
이런 숫자는 매우 중요해진다.

만약 react reconciliation 알고리즘이 전체 tree를 순회하고 그때마다 수정이 생기고,  
리렌더링을 한다면, 그리고 순회가 16ms보다 더 걸린다면, 이것은 drop frame을 만들게 될 것이다.

이것이 많은 사람들이 reconcilation이 모든 업데이트를 맹목적으로 적용하지 않고, 우선순위를 나누어 업데이트 하기를 원했던 이유다.  
또한 이들은 다음 프레임에서 작업을 일시 중단하고, 다시 시작할 수 있는 기능이 추가되기를 원했다.

<br>

## How does React Fiber work? :

이제 우리는 fiber가 개발된 동기를 알게 되었다.  
이제 달성해야만하는 기능을 요약해보자. :

- 다른 종류의 작업에 우선순위를 부여하기
- 작업을 중단하고 나중에 다시 시작하게 만들기
- 더 이상 필요없어지면 작업을 버리기
- 이전에 완료된 작업을 재사용하기

이런 기능들을 적용하기 위한 여러 도전들 중 하나는 어떻게 자바스크립트 엔진이 일할 것이냐 하는 것이었다.  
왜냐하면 자바스크립트 엔진은 싱글 스레드이기 때문이다.  
이것을 이해하기 위해서 간단하게 자바스크립트 엔진이 어떻게 실행 컨텍스트를 다루는지를 살펴보자.

<br>

## The JavaScript execution stack :

자바스크립트에서 함수를 실행할 때마다, 자바스크립트 엔진은 실행컨텍스트를 생성할 것이다.  
매번 자바스크립트 엔진이 실행될 때마다,  
이것은 전역 실행컨텍스트를 만든다. 그리고 그것은 전역 객체를 가지고 있다.  
예를 들어서 브라우저의 window객체나, 노드의 global 객체 같은 것들 말이다.  
자바스크립트는 그런 컨텍스트들을 스택 자료구조를 활용해서 다룬다.  
이름하여 콜스택이다.

때문에 당신이 뭔가를 작성하고 실행하면 자바스크립트는 전역 컨텍스트를 생성하고 그것을 콜 스택에 넣을 것이다.

```javascript
function a() {
  console.log("i am a")
  b()
}

function b() {
  console.log("i am b")
}

a()
```

그러고 나면, 이것은 함수 실행컨텍스트를 만든다. a()함수가 호출됨에 따라서.  
b()함수가 그 안에서 호출되었기 때문에, 이것은 또 다른 실행 컨텍스트를 만들고,  
그것을 콜 스택에 넣는다.

b 함수가 return 한다면, 엔진은 b 컨텍스트를 없앨 것이다.  
a 함수도 return 한다면, 엔진은 a 컨텍스트를 없앨 것이다.

하지만, HTTP 요청 같은 비동기 작업들은 어떻게 이루어질까?

자바스크립트 엔진은 다른 동작을 한다. :
자바스크립트는 콜 스택 맨 위에 queue 자료구조를 가지고 있다.  
그리고 이 큐는 비동기 작업들을 다룬다.

The JavaScript engine handles the items in the queue by waiting for the execution stack to empty. So, each time the execution stack empties, the JavaScript engine checks the event queue, pops items off the queue, and handles the event.

It is important to note that the JavaScript engine checks the event queue only when the execution stack is empty or the only item in the execution stack is the global execution context.

Although we call them asynchronous events, there is a subtle distinction here: the events are asynchronous with respect to when they arrive into the queue, but they’re not really asynchronous with respect to when they are actually handled.

다시 stack reconciler로 돌아와서, 리액트가 tree를 순회할 때, 이것은 마찬가지로 콜스택에서 동작한다.  
그래서 업데이트가 도착하면, 그들은 event queue에 들어간다.  
그리고 오직 콜스택이 비어있을때만, 수정작업이 이루어진다.

이 지점이 바로 정확하게 Fiber가 해결하고자 하는 것이다.  
아주 똑똑하게 멈추고, 재개하고, 버리는 작업들을 수행하는 stack을 재구현 함으로써

Andrew Clark의 말을 다시해보자면,

> Fiber는 stack은 재구현한다. 리액트 컴포넌트에 최적화되어서. 당신은 하나의 단일 fiber를 가상 stack frame이라고 생각하면된다.

이렇게 스택을 재구현하는 것의 장점은, stack frame을 메모리에 유지하고 수행할 수 있다는 것이다. 당신이 언제든 어떻게든 원할때마다.  
이것은 우리가 스케쥴링 목표를 달성하기 위해서 매우매우 중요한 것이다.

스케줄링을 제외하고, 수동적으로 stack frame을 다루게 되면, 기능들의 잠재력을 한껏 끌어올릴 수 있습니다.  
예를 들어, 동시성이나, error boundaries 같은 것들이 되겠습니다.  
이런 주제들은 나중에 다뤄볼 것입니다.

단순한 하게 말해보자면, fiber는 virtual stack의 한 단위를 나타냅니다.  
이전 reconciliation 알고리즘의 구현에서는, 리액트는 불변한 tree object를 만들고, 그것을 순회했었다.

최근의 구현에서는, 리액트는 fiber의 트리를 구현한다. 그리고 그 Fiber를 Mutate할 수 있다.  
fiber노드는 컴포넌트의 state,props, 그리고 렌더링해야 할 element 들을 효율적으로 유지한다.

그리고 fiber 노드는 mutate할 수 있기 때문에, 리액트는 매번 노드를 새롭게 만들 필요가 없어졌다.  
이것은 단순하게 복사하고, 필요할 때면 그것을 수정해준다.

(왜 fiber에서는 mutate하게 관리하기를 선택한 것일까? )

fiber tree에서는 리액트가 재귀적으로 tree를 순회하지 않는다. 대신에, 이것은 단일 연결 리스트를 만든다. 그리고 부모 우선 깊이 탐색을 수행한다.

## Singly-linked list of fiber nodes :

fiber 노드는 stack frame과 리액트 컴포넌트를 나타낸다.  
fiber노드는 다음과 같은 멤버들로 구성되어 있다 :

- Type
- Key
- Child
- Sibling
- Return
- Alternate
- Output

### Type

<div> and <span>, for example, host components (strings), classes, or functions for composite components.

### Key

The key is the same as the key we pass to the React element.

### Child

Represents the element returned when we call render() on the component:

### Sibling

Represents a case where render returns a list of elements:

```javascript
const Name = props => {
  return [<Customdiv1 />, <Customdiv2 />]
}
```

### return

return은 stack frame으로 돌아가는 것이다. 논리적으로 부모 fiber node로 돌아간다, 그러므로 parent 노드를 나타내는 것이다.

pendingProps 과 memoizedProps  
메모이제이션은 함수 실행의 결과를 저장하는 것을 의미한다. 그렇게 함으로써 나중에 그것을 사용할 수 있게 하는 것이다.  
pendingProps는 컴포넌트에 전달된 props를 나타내는 것이고, memoizedProps는 실행 스택의 맨 끝에서 초기화하고, 그 노드의 props를 저장한다.

들어온 pendingProps가 memoizedProps과 같으면, fiber의 이전 결과가 재사용될 수 있다는 이야기이고, 덕분에 불필요한 작업을 막을 수 있다.

pendingWorkPriority  
pendingWorkPriority는 fiber에 의해서 표현되는 작업의 우선순위를 나타내는 숫자이다.  
ReactPriorityLevel module은 다른 우선순위 레벨을 나열한다.  
NoWork의 제외와 함께, NoWork는 0을 의미하는데, 더 큰 숫자는 낮은 우선순위를 나타낸다.

예를 들어서, fiber 우선순위가 주어진 레벨에 비해서 높은지 아닌지를 확인하게 위해서 아래의 함수를 사용할 수 있다. 스케줄러는 수행할 다음 작업의 유닛을 찾기 위해서 우선순위 필드를 사용한다.

```javascript
function matchesPriority(fiber, priority) {
  return (
    fiber.pendingWorkPriority !== 0 && fiber.pendingWorkPriority <= priority
  )
}
```

### Alternate

모든 순간에, 컴포넌트 인스턴스는 최대 두개의 fiber를 가진다 : 그 두개란 현재 fiber와 in-progress fiber이다.  
current fiber의 대안은 in progress fiber이다. 그리고 in progress에 있는 fiber의 대안은 current fiber이다.

current fiber는 무엇이 이미 render되었는지를 나타내고, in-progress fiber는 개념적으로 returned되지 않은 stack frame을 나타낸다.

### OutPut

output는 리액트의 leaf node를 말한다. 이들은 렌더링 환경에 따라서 다르다. (예를 들어, 브라우저에서는 div나 span을 말한다.)  
jsx에선, 그들은 소문자 태그를 사용하여 표시된다.

개념적으로, fiber의 결과는 함수의 결과이다.  
모든 fiber는 결국에 output을 가지고 있지만, output은 오로지 host 컴포넌트에 의해서 lead node에서만 생성된다.  
그런다음 output은 tree 위로 전송된다.

output은 결국에는 renderer에게 주어진다. 그렇게 함으로써 이것은 rendering 환경에서의 변경사항을 flush 할 수 있다.  
예를 들어, fiber tree가 아래와 같은 코드를 가진 앱을 찾는 방법을 살펴보겠습니다.

```javascript
const Parent1 = props => {
  return [<Child11 />, <Child12 />]
}

const Parent2 = props => {
  return <Child21 />
}

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    ;<div>
      <Parent1 />
      <Parent2 />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
```

우리는 확인할 수 있다. fiber tree가 자식노드끼리 서로 연결되어 있는 단일 연결 리스트로 구성되어 있다는 것을 알 수 있다. (sibling relationship)  
그리고 부모와 자식간에도 연결되어 있는 것을 확인할 수 있다.  
이런 tree는 깊이우선탐색에 의해서 순회될 수 있다.

![linked list](./img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-07-29%20%EC%98%A4%ED%9B%84%209.54.41.png)

## Render phase

리액트가 어떻게 tree를 만들고, reconciliation 알고리즘을 수행하는지 이해하기 위해서, 리액트 소스코드를 가지고 unit test를 진행해보자.

createFiberFromTypesAndProps() 이 함수는 react element로부터 react fiber를 만든다.  
테스트를 실행하면, 이 함수에 breakpoint를 심어놓고, call stack을 살펴보자.

확인해볼 수 있듯이, createFiberFromTypeAndProps()이 함수에서 밑으로 내려가보면, call stack은 결국 render 호출로 돌아간다.  
몇몇 흥미로운 함수들이 있다. workLoopSync(), performUnitOfWork(), and beginWork().

### workLoopSync() :

workLoopSync() 이 함수는 리액트가 tree를 만들기 시작할 때,
App 노드에서 시작해서 재귀적으로 div와 button을 움직인다. 그리고 이것들은 App의 자식들이다.  
workInProgress는 작업해야 할 next fiber node에 대한 참조를 유지하고 있다.

### performUnitOfWork() :

performUnitOfWork() 이 함수는 fiber 노드를 인자로 받고, 그리고 대체할 node를 받고, beginWork를 호출한다.  
이것이 실행콘텍스트에서 콜스택에 스택 프레임을 쌓는 것과 동등한 역할을 하는 것이다.

### beginWork() :

리액트가 tree를 만들 때, 이 함수는 단순하게 createFiberFromTypeAndProps 이 함수로 유도하고, fiber node를 만든다.  
리액트는 재귀적으로 작업을 수행하고 결과적으로 performUnitOfWork 함수는 null을 반환한다.  
이것이 의미하는바는 tree의 마지막에 닿았다는 것이다.

<br>

## Using instance.handleClick()

이제, instance.handleClick() 함수가 실행될 때 어떤 일이 일어날까?  
handleClick이 함수는 button을 클릭하고, state를 업데이트 한다.

이 경우에 리액트는 fiber tree를 순회한다.
그리고 각각의 node를 복사하고,
각각의 node에 대해서 실행될 필요가 있는지 없는지를 확인한다.

비록 completeUnitOfWork와 completeWork 이 두개의 함수는 이전 콜스택에서는 볼 수 없었지만, 여기서는 확인이 가능하다.  
이 두개의 함수는 performUnitOfWork() and beginWork()와 비슷하다.  
위의 completeUnitOfWork와 completeWork 이 두 함수는 스택으로 돌아가는 것을 의미하는 현재 실행의 완료 부분을 수행한다.

우리가 볼 수 있듯이, 이 네 가지 기능은 함께 unit of work를 실행하고 현재 수행 중인 작업에 대한 통제력을 가진다. 이 부분이 바로 바로 stack reconciler에선 놓치고 있던 부분이다.

아래에 있는 이미지가 각각의 fiber node가 unit of work를 수행하기 위해 4가지 단계로 구성되어 있다는 것을 보여준다.

![fiber node's four phases](./img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-07-30%20%EC%98%A4%ED%9B%84%208.21.26.png)

각각의 자식이나 형제가 completeWork를 반환하지 않으면, completeUnitOfWork로 넘어가지 않는다는 지점을 주목하는 것이 중요하다.

예를 들어서, <App/> 을 위해서 performUnitOfWork() and beginWork() 를 실행시키고나면,  
Parent1의 performUnitOfWork() and beginWork()로 움직이고, 이런식으로 반복된다.  
그리고 <App/> 의 자식들의 작업이 끝나면, <App/> 의 작업 완료단계로 돌아온다.

이것이 리액트가 render 단계를 수행할 때 일어나는 일들이다.  
click()함수에 의해서 새롭게 지어진 tree는 workInProgress tree로 불린다.  
이것은 기본적으로 렌더링 되기를 기다리는 draft tree이다.

<br>

## Commit Phase :

render phase가 완료되고나면, 리액트는 commit 단계로 넘어간다.

Once the render phase completes, React moves on to the commit phase, where it basically swaps the root pointers of the current tree and workInProgress tree, thereby effectively swapping the current tree with the draft tree it built up based on the click() update.
