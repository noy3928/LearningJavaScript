# The how and why on React’s usage of linked list in Fiber to walk the component’s tree

[https://indepth.dev/posts/1007/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree]

fiber를 구현한 내부 소스코드를 들여다보면,  
단순히 실질적인 문제를 해결하는 것을 넘어서서,  
개발자의 성장에 도움이 되는 많은 자료들이 숨어있다.

fiber에 대한 검색을 해보면 대부분 하이레벨 차원에서만 설명을 한다.  
하지만 이 아티클에서는 직접 소스코드를 뜯어보면서 설명을 진행할 것이다.

## Setting Background

fiber는 2개의 큰 단계가 있다. render 단계와 commit 단계다.  
reconciliation 단계가 이루어지는 때는 render 단계이다.  
이 단계에서는 :

- updates state and props,
- calls lifecycle hooks,
- retrieves the children from the component,
- compares them to the previous children,
- and figures out the DOM updates that need to be performed.

이 모든 일들은 Fiber 안에서 이루어진다.  
각각의 일들은 리액트 element의 type에 따라서 달라진다.

여기 리액트가 각각의 type에 부여한 코드가 있다.

```javascript
export type WorkTag =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16

export const FunctionalComponent = 0
export const FunctionalComponentLazy = 1
export const ClassComponent = 2
export const ClassComponentLazy = 3
export const IndeterminateComponent = 4 // Before we know whether it is functional or class
export const HostRoot = 5 // Root of a host tree. Could be nested inside another node.
export const HostPortal = 6 // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 7
export const HostText = 8
export const Fragment = 9
export const Mode = 10
export const ContextConsumer = 11
export const ContextProvider = 12
export const ForwardRef = 13
export const ForwardRefLazy = 14
export const Profiler = 15
export const PlaceholderComponent = 16
```

한꺼번에 작업이 동시에 일어나면 생기는 문제가 있는데,  
그것은 바로 프레임 드롭이다.

'한번에' 작업이 일어난다는 말은 무슨말일까?  
기본적으로 리액트는 전체 tree를 동기적으로 훑어본다. 그리고 각각의 컴포넌트를 수행한다.  
그러면 이것의 로직을 수행하는데 16ms를 넘어갈 수 도 있다.  
그리고 이것은 프레임 드롭을 일으킬 수 있는 요소가 되는 것이다.

그러면 requestIdleCallback 같은 API는 도움이 될까?

> 브라우저의 idle 상태에 호출될 함수를 대기열에 넣습니다. 이를 통해 개발자는 애니메이션 및 입력 응답과 같은 대기 시간이 중요한 이벤트에 영향을 미치지 않고 메인 이벤트 루프에서 백그라운드 및 우선 순위가 낮은 작업을 수행 할 수 있습니다.

아래는 해당 메서드를 실행한 코드다.

```javascript
requestIdleCallback(deadline => {
  console.log(deadline.timeRemaining(), deadline.didTimeout)
})
```

> requestIdleCallback 이 메서드는 제한사항이 많다. 그래서 이와같은 함수를 리액트 팀에서는 직접 구현해야만 했다.

```javascript
requestIdleCallback(deadline => {
  // while we have time, perform work for a part of the components tree
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    nextComponent
  ) {
    nextComponent = performWork(nextComponent)
  }
})
```

그런데 이렇게 구현한다 할지라도, 전체 tree를 한번에 처리하는 일은 불가능하다.  
그리고 이런 api를 사용하려한다면 incremental unit 단위로 나눌 수 있어야 한다.
(incremental unit은 뭔소리일까?? )

이런 문제를 해결하기 위해서 리액트는 단일 연결 리스트와 포인터를 이용한 비동기 모델로 내장 stack을 구현했다.

Andrew라는 사람이 이런 말을 했다.

> 만약에 내장 call stack을 이용한다면, 이것은 call stack이 비어있기 전까지 계속 작동할 것이다.. 그렇게 되면 일부러 call stack에 인터럽트를 하려고 하거나, stack frame을 수동적으로 조작하려고 할 때 별로 좋지 않을 것이다. 이것이 리액트 fiber의 목적이다. fiber는 stack을 재구현했다. react component에 최적화된 그런 stack을 구현한 것이다. 당신은 하나의 fiber를 virtual stack frame으로 생각해도 된다.

## Why is the stack relevant to React?

처음 아티클에서 정의했다시피,  
리액트는 render 단계 동안에 component tree를 순회한다.  
그리고 component를 위한 몇몇 작업들을 수행한다.

이전의 알고리즘에서는 동기적이고 재귀적인 모델을 사용했었다.  
그리고 그 모델은 내장 call stack에 의존적이었다.  
reconciliation의 공식문서에서 이런 과정을 설명하고 있고, 재귀에 대해서 많은 것을 알려주고 있다.

> 기본적으로 DOM노드의 자식들을 재귀할 때, 리액트는 동시에 두개의 자식리스트들을 순회한다 그리고 뭔가 차이점이 있을 때, 변형을 만든다.

만약 생각을 해본다면, 각각의 재귀적인 호출은 frame을 stack에 넣을 것이다.  
그리고 이것은 동기적으로 이루어질 것이다.  
다음과 같은 컴포넌트 tree를 가지고 있다고 가정해보자 :

![component tree](./img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-08-01%20%EC%98%A4%ED%9B%84%203.58.58.png)

이런 컴포넌트를 객체로 표현하면 다음과 같을 것이다.

```javascript
const a1 = { name: "a1" }
const b1 = { name: "b1" }
const b2 = { name: "b2" }
const b3 = { name: "b3" }
const c1 = { name: "c1" }
const c2 = { name: "c2" }
const d1 = { name: "d1" }
const d2 = { name: "d2" }

a1.render = () => [b1, b2, b3]
b1.render = () => []
b2.render = () => [c1]
b3.render = () => [c2]
c1.render = () => [d1, d2]
c2.render = () => []
d1.render = () => []
d2.render = () => []
```

리액트는 tree를 순회할 필요가 있고 각각의 컴포넌트의 작업을 수행할 필요가 있다.  
간단하게 해서, 해야 할 작업이 현재 컴포넌트의 이름을 출력하고 자식을 받는 것이라고 해보자.  
아래에 재귀적으로 이런 작업을 어떻게 하는지가 나와있다.

## Recurvise traversal

tree를 순회하는 기본적인 함수는 walk이다.

```javascript
walk(a1)

function walk(instance) {
  doWork(instance)
  const children = instance.render()
  children.forEach(walk)
}

function doWork(o) {
  console.log(o.name)
}
```

그리고 여기 결과물이 있다.

```javascript
a1, b1, b2, c1, d1, d2, b3, c2
```

이런 재귀적인 접근법은 직관적이고 tree를 순회하기에 적합하다.  
하지만 밝혀졌듯이, 이것은 한계가 있다.  
가장 큰 한계는 우리가 이것을 incremental unit으로 쪼갤 수 없다는 것이다. (incremental unit이 뭔지 이해해야 이 말을 이해할 것 같다. )  
우리는 특정 컴포넌트에서의 작업을 멈추거나, 그것을 나중에 다시 시작할 수가 없다.  
이런 접근을 사용한다면 리액트는 stack이 비어있을 때까지 계속해서 작업을 할 것이다.

그래서 리액트는 어떻게 재귀없이 tree를 순회할 수 있는 알고리즘을 구현했을까?  
이것은 단일 연결 리스트 traversal 알고리즘을 사용해서 구현되었다.  
이것은 순회를 멈출수도 있고, 스택이 커지는 것을 막을 수 있다.

## Linked List traversal

[참고자료 : https://github.com/facebook/react/issues/7942?source=post_page---------------------------#issue-182373497]

이 알고리즘을 구현하기 위해서는 3가지 필드가 필요하다.

- child : first child에 대한 참조
- first sibling에 대한 참조
- return : 부모에 대한 참조

새로운 재조정 알고리즘의 맥락에서, 이런 필드로 만들어진 자료구조는 Fiber라고 불린다.  
내부적으로는 react element를 표현한 것이라고 할 수 있는데, react element는 해야 할 작업의 대기열이라고 할 수 있다.  
이것에 대한 더 세부적인 내용은 다음 아티클에서 다룰 것이다.

The following diagram demonstrates the hierarchy of objects linked through the linked list and the types of connections between them:

```javascript
class Node {
  constructor(instance) {
    this.instance = instance
    this.child = null
    this.sibling = null
    this.return = null
  }
}
```

그리고 들어온 node에 대해서 그 자식들과 단일 연결 리스트로 연결시켜주는 함수가 있다.

```javascript
function link(parent, elements) {
  if (elements == null) elements = []

  parent.child = element.reduceRight((prev, cur) => {
    const node = new Node(cur)
    node.return = parent
    node.sibling = prev
    return node
  }, null)
  return parent.child
}
```

그리고 이 함수는 parent 노드의 가장 첫번째 자식을 반환한다.

```javascript
const children = [{ name: "b1" }, { name: "b2" }]
const parent = new Node({ name: "a1" })
const child = link(parent, children)

child.instance.name === "b1" //true
child.sibling.instance === children[1] // true
```

현재 노드와 자식노드들을 연결 시켜주는 것을 도와주는 helper 함수가 있다.

```javascript
function doWork(node) {
  console.log(node.instance.name)
  const children = node.instance.render()
  return link(node, children)
}
```

그리고 이제 노드들을 탐색하는 walk 함수가 있다. 이 함수는 깊이 우선 탐색이다.

```javascript
function walk(o) {
  let root = o
  let current = o
  while (true) {
    let child = doWork(current)
    //자식이 있으면 현재 active node로 지정한다.
    if (child) {
      current = child
      continue
    }

    //가장 상위 노드까지 올라간 상황이라면 그냥 함수를 끝낸다.
    if (current === root) {
      return
    }

    //형제 노드를 찾을 때까지 while문을 돌린다. 이 함수에서는 자식에서 부모로 올라가면서 형제가 있는지를 찾아주는 역할을 하고 있다.
    while (!current.sibling) {
      //top 노드에 도달했으면 그냥 끝낸다.
      if (!current.return || current.return === root) {
        return
      }

      //부모노드를 현재 노드에 넣어준다.
      current = current.return
    }
    current = current.sibling // while문을 빠져나왔다는 것은 sibling을 찾았다는 것이다. 찾은 sibling을 현재 current node에 넣어준다.
  }
}
```

이 walk함수를 사용하면 스택이 계속해서 쌓이지 않는다. 그저 그 자리에서 계속 바뀌는 것일 뿐이다.
이 함수의 핵심은 current node에 대한 참조를 계속 유지한다는 것이다.  
그리고 마지막에 도달할 때까지 계속 내려갈때까지 계속 current node를 재할당한다는 것이다.

이 함수는 마치 브라우저상의 call stack과 닮아있다.

이 덕분에 우리는 언제든지 순회를 멈출 수 있고, 재개하는 것이 가능하다.
현재 참조하고 있던 node가 무엇인지 알 수 있기 때문에.  
이것이 명백하게 requestIdleCallback API를 통해서 이루고자 했던 것이다.

## Work Loop in React

```javascript
function workLoop(isYieldy) {
  if (!isYieldy) {
    //Flush work without yielding
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
  } else {
    while (nextUnitOfWork !== null && !shouldYield()) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
  }
}
```

보다시피 아주 훌륭하게 매핑을 하고 있다.  
이것은 지속해서 nextUnitOfWork안에 있는 current node에 대한 참조를 유지하고 있다.  
그리고 그 노드는 top frame으로써 행동하고 있다.

알고리즘은 컴포넌트 tree를 동기적으로 순회할 수 있고 각각의 노드의 작업을 수행할 수 있다.  
이렇게 동기적으로 처리되는 경우는 일반적으로 ui event에 의해서 일어나느 interative updates라고 할 수 있다. (click, input)  
또한 이것은 비동기적으로도 순회할 수 있다. 만약에 fiber node가 작업을 수행한 후 시간이 남아있다면.  
shouldYield 함수는 deadlineDidExpire와 deadline에 의해서 결과를 반환한다. 그리고 그것들은 지속적으로

The function shouldYield returns the result based on deadlineDidExpire and deadline variables that are constantly updated as React performs work for a fiber node.
