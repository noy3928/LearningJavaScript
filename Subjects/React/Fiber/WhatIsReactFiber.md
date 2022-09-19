# What is React Fiber

https://www.geeksforgeeks.org/what-is-react-fiber/

- fiber는 리액트의 렌더링을 더 똑똑하고 빠르게 만들어주는 알고리즘 혹은 개념이다.

- fiber는 reconciliation의 작업을 더 효율적이게 만들어준다.
  - reconciliation은 두 virtual tree를 비교해서 필요한 부분만 찾아내는 작업을 말한다.

## Fiber의 목적 :

- animation과 responsiveness에 집중한다.
- task를 chunk로 쪼개고 우선순위를 정하는 작업을 한다.
- 일을 멈췄다가 다시 시작하는 것이 가능하다.
- 이전에 완료되었던 작업들을 재사용하거나, 필요하지 않으면 버릴 수도 있다.

## Old 버전의 문제 :

stack reconciliation은 stack 기반이었다.  
무슨말이냐, 동기적으로 실행된다는 것이다.  
비동기 처리가 안된다. 인터럽트가 안된다는 것인데 이것이 왜 문제가 된다는 것일까?  
예를 들어보자, input에 사용자가 입력을 하는 중이다. 그런데 네트워크에서 무언가 작업물을 받아왔다.  
그러면 그것을 렌더링 해줘야하는 것이다. 이 두가지 작업에 충돌이 생기면, 화면은 버벅거릴 것이다. 이것이 stack이 동기적으로 처리되기 때문에 생기는 일이다.  
(이것이 왜 stack이 동기적이기 때문에 생기는 일인가? stack에서는 그대로 call stack에 올라오면 실행을 처리하려고 할 것이다. 그런데, 입력값 같은 경우에는 곧바로 처리되어야하기 때문에 우선순위가 높다. 때문에 이 입력값의 경우에는 곧바로 인터럽트로 치고 들어올 수 있어야한다. 반면 네트워크에서 받아온 데이터를 화면에 렌더링 시켜주는 작업은 뒤로 미뤄야하는 것이고.)  
이런 상황 때문에 인터럽트가 필요해졌다.

## Fiber의 기능은 무엇인가? :

- fiber가 대단한 성능 향상을 가져다주지만, 사실 그것만을 위한 기능은 아니다. 그저 이것은 리액트가 동작하는 방식이라고 말할 수 있다.
- 리액트를 훨씬 더 빠르고 똑똑하게 만들어 준다.

## Fiber는 어떻게 일하는가?

Fiber = unit of work

unit of work가 끝나면 finishWork()가 호출된다. 그러면 commit phase로 들어가 실제 dom에 적용한다.

### Render Phase :

이 단계는 비동기적이다. task의 우선순위를 나누고, 몇몇 일들은 멈추거나 버린다.  
이 단계에서 fiber(unit of work)가 진행중이다. 내부적으로는 beginWork와 completeWork 함수가 호출되고 있는 중이다.

### Commit Phase :

이 단계는 동기적이다. commitWork()라는 함수가 호출된다. 이 단계에서는 인터럽트가 일어나지 않는다.  
fiber를 진행시키면 곧바로 일하거나, 미래를 위해 스케줄링을 한다.  
animation처럼 우선순위가 높다면 곧바로 실행하고, network를 통해 받아온 작업물 같은 경우에는 뒤로 미룬다.  
이런 작업을 하기 위해서 내부적으로는 requestAnimationFrame 과 requestIdleCallback 함수를 사용한다.

## Fiber Tree :

실제로 2가지 tree가 있다.  
한가지는 current Tree이고, 다른 한가지는 workInProgress tree이다.  
current tree는 현재 화면에 있는 tree를 말한다. 때문에 react가 이것을 바꿀 수 없다.  
대신에 리액트는 workInprogress tree에 있는 요소를 바꿀 수는 있다.

## 남아있는 질문 :

- 우선순위를 정하는 기준은 무엇인가?
- 작업을 멈춰야하는 경우는 언제인가?
- 이전에 완료되었던 것을 재사용하는 경우는 언제인가?
