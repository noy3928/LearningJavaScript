- v8 engine이 하는 일

  - jscode를 machine code로 변환한다. 그리고 cpu에서 결과를 실행한다.

## JIT - Just in time compilation

- js 파일이 브라우저에 의해서 로드되면, v8의 parser가 이 파일을 AST로 변환한다.
  - AST란 abstract syntax tree의 약자다.
  - 이 tree는 ignition에 의해 사용된다.
    - ignition이란 bytecode를 생성하는 interpreter라고 생각하면 된다. -> [ignition] 추가자료
    - bytecode란 최적화되지 않은 머신코드에서 의해서 실행되는 추상화된 코드라고 생각하면 된다. -> [bytecode] 추가자료
  - v8은 bytecode를 main thread에서 실행한다.
    - TurboFan이라는 최적화 컴파일러가 다른 스레드에서 작업을 하는 동안
      - 이 TurboFan은 최적화된 머신 코드를 생성하는 일을 한다.

[ignition]: https://v8.dev/blog/ignition-interpreter

[bytecode] : https://medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775

## Call Stack

- js는 싱글 스레드언어이다. 그리고 single call stack을 사용한다.
- v8엔진은 실행중의 데이터를 call stack에 저장한다.
- call stack은 stack frame으로 이루어져있다.
  - 각각의 stack frame은 호출된 함수가 return되면 call stack에서 제거된다.
  - stack frame은 1.local variables 2.argument parameters 3.return address가 저장되어 있다.
- 우리가 함수를 실행시키면 v8엔진은 frame을 stack에 올린다.

<br>

## Heap

- v8엔진은 컴파일 타임에서부터 얼마나 많은 메모리를 사용해야할지 모른다.
- 때문에 이런 메모리 저장은 heap에서 일어난다.
- 중요한 점이 있다면 heap에 저장된 메모리들은 함수의 실행이 끝나고 남아있다.
  - 아니 그러면 어떻게 메모리 관리가 되는가??
- v8엔진의 GC(garbage collector)가 그 일을 한다.
  - GC는 더 이상 사용되지 않는 메모리를 해제한다.
  - 다른 말로하면 더 이상 참조가 없는 변수들을 삭제하는 것이다.

<br>

## Browser Runtime

- 브라우저는 ui를 그리는 작업도 해야하고, 네트워크 작업도 해야한다. 어떻게 이 두가지 일을 동시에 할 수 있지?
- browser engine 때문에 이런 일들이 동시에 가능해진다.
  - browser engine은 html과 css를 rendering하는 것에 책임이 있다.
- 셋타임아웃 같은 함수는 나중에 등록된다. 그리고 각각의 수행들은 비동기적으로 이루어진다. 이런 일들이 어떻게 일어날까?

<br>

### event table & event queue

- event table은 자료구조이다.
  - 이 자료구조에서는 events에 해당하는 callback 함수들을 매핑하고 있다.
- setTimeout에서 조건이 완성되면, 넘겨진 callback함수는 event queue에 들어간다.
  - event queue는 다른말로 callback queue라고 부르기도 하고, task queue라고 부르기도 하고, message queue라고 부르기도 한다.
  - event queue는 call back 함수로 이루어져 있는 자료구조이다.

<br>

### event loop

- event loop는 call stack이 비어있는지 아닌지를 계속해서 체크한다.
- 만약 call stack이 비었다면, callback queue에 먼저 들어온 녀석을 콜 스택에 올린다.
- 이 함수는 call stack이 빌 때까지 계속 실행되고, call stack이 비어있게 되면 event loop는 다음 콜백함수를 콜스택에 올린다.

<br>

### Job queue

- job queue는 micro- task queue라고 불리기도 한다.
- 이 queue는 promise 객체로 채워져 있다.
  - promise 객체는 resolve와 reject함수를 반환한다.
- job queue는 task queue 보다 더 높은 우선순위를 가진다.
- 이제 무슨 의미냐? event loop가 call stack 비어있을 때, 먼저 데려오는 녀석은 job queue 안에 있는 친구들이라는 것이다. event queue 안에 있는 친구들은 후순위다.

<br>

## Blocking vs Non - Blocking

- v8엔진이 stack frame의 일을 처리하고 있는 동안은 바쁘다. 그래서 다른 일은 못한다.
- event loop도 막힐 것이다. call stack에 비어지지 않게 된다면, job queue나 event queue에 있는 어떤 작업도 실행될 수가 없다.
- Web Api는 non - blocking code를 작성할 수 있다.

  - 이것은 c++코드로 작성되어 있으며, 분리 되어있는 thread에서 실행된다.
  - 연산이 완료되고 나면, callback은 event queue에 들어간다.
  - 그러는 동안 v8은 여전히 js code을 수행하고 있다.

- 이런 동시적인 모델에 의해서, 우리는 네트워크 작업, ui작업을 막힘 없이 동시에 수행할 수 있다. 자바스크립트의 실행 동안에
