# Motivation

- spa 어플이 점점 더 복잡해지면서, 우리의 코드가 관리해야 할 state가 훨씬 많아졌다.

관리해야 할 state의 종류 :

- server responses
- cached data
- locally created data
- ui state
- active routes
- selected tabs
- spinners
- pagination controls

- state가 많아지고, 한 model이 업데이트 될 때, 다른 모델이 업데이트 되는 상황이라면, 이런 일들이 반복될 때, 수없이 많은 업데이트가 일어나면서 더이상 어디서부터 왜 어떻게 변하는지 추적하는게 힘들어진다. 이렇게되면 버그를 픽스하는 것도 힘들다.

이런 수 많은 복잡성을 딱 두가지 개념으로 구분하면 다음과 같다. : mutation and asynchronicity  
이것은 멘토스와 콜라로 비유해볼 수 있는 것이다.  
각각 분리되어 있으면 최고지만, 합쳐지면 최악이다..

리액트 라이브러리가 시도하려는 것이 이런 문제점을 해결하려는 것이다.  
view 단에서 비동기작업과 직접적인 dom 조작을 피하는 것을 통해서.

하지만, state를 통제하는 것은 전적으로 사용자에게 달려있다. 이 지점에서 redux가 들어온다.
리덕스가 시도하려는 것은 예상가능한 state의 변경이다.  
특정 제한을 걸어버림으로써 어떻게 언제 변하는지를 알 수 있게 만든다.  
그리고 이런 특정 제한은 리덕스의 3가지 원칙에서 잘 녹아들어가 있다.

<br>

# Three Principles

## Single source of truth

전역 상태는 하나의 스토어에 저장된다. 그리고 그 스토어는 하나의 객체로 이해하면 된다.

- 이것은 전역적인 앱을 만드는 것을 쉽게 만들어준다.
- single state tree는 디버깅하고 테스팅할때도 유용하다.
- 되돌리기,취소하기 처럼 몇몇의 기능은 구현하기가 힘들었지만, single tree에 state를 저장하고 있으면 그 즉시 사소한 구현이 된다.

## State is read-only

- state를 변경할 수 있는 유일한 방법은 action을 이용하는 것이다.
- 여기서 action이란 어떤 행위를 할 것인지를 묘사하는 객체이다.

- 이것은 확실하게 해준다. view나 network callback이나 직접 state를 수정하지 못하도록
- 대신에, action은 state 변경에 대한 의사를 표시한다.
- 모든 변경사항들은 중앙집중적이고, 엄격한 절차에 의해서 순차적으로 일어나기 때문에, 뭔가 경계를 해야할 부분이 없다.
- action은 그냥 객체이기 때문에, 그들은 logged , serialized, stored, 그리고 나중에 replay 될 수 있다.

## Changes are made with pure functions

- action에 의해서 state tree를 변경할 것에 대한 부분을 명시적으로 하기 위해서는 pure reducer를 작성해야 한다.

- 리듀서는 순수한 함수이다. 이 함수가 하는 역할은 이전의 state와 action을 가지고 next state를 반환하는 것이다.
- 이전 state를 변경시키는 대신에 새로운 state 객체를 반환한다는 사실을 꼭 기억하자.
- 처음에는 그냥 하나의 리듀서로 시작해도 되지만, 앱이 커짐에 따라서 이것을 작은 단위로 쪼개어도 좋다. 그렇게 해서 더 세부적으로 state tree를 관리하면 된다.
- reducer는 함수에 불과하기 때문에, 그 함수가 호출되었을 때 순서를 통제할 수 있고, 추가적인 데이터를 넣어줄 수 있고, 심지어 리듀서를 재사용 가능하도록 만들 수도 있다.

---

## Glossary

### State :

```javascript
type State = any
```

- state는 광범위하게 쓰이는 용어이다.
- 하지만 리덕스에서는 single state value로써 언급한다. 그리고 이 single state value는 store에 의해서 관리되고, getState에 의해서 반환된다.
- 이것은 리덕스 어플리케이션 전체의 state를 표현하는데에 사용된다. 또한 이것은 꽤 자주 중첩된 객체의 형태로 존재한다.

- convention에 의하면, top-level state는 객체이거나 또 다른 key-value 모음집이다. Map처럼. 하지만 기술적으로는 어떤 type도 가능하다.
- 대신에 state를 serializable하게 관리하는 것이 필요하다. (직렬화하게 관리한다?? 이게 무슨 말이지? )
- JSON형식으로 변환할 수 없는 것을 아무거나 막 집어넣지는 마라.

  By convention, the top-level state is an object or some other key-value collection like a Map, but technically it can be any type. Still, you should do your best to keep the state serializable. Don't put anything inside it that you can't easily turn into JSON.

### Action :

```javascript
type Action = Object
```

- action은 plain한 객체이다. 그리고 그 객체는 state 변화에 대한 의도를 나타낸다.
- action은 store에 data를 넣기 위한 유일한 방법이다.
- 어떤 데이터든지 간에 결국에는 action으로써 dispatched 되어야 한다.

- action은 반드시 type 필드를 가져야 한다. 그 type 필드는 액션이 수행할 행동에 대한 타입을 가리킨다.
- 타입은 상수로 정의내려질 수 있고 다른 모듈로부터 가져와서 사용할 수도 잇다.
- symbol을 사용한 것보다는 string을 사용하는 것이 났다. string은 serializable이 가능하기 때문이다.

- type외에, 액션 객체의 구조는 사용자에게 전적으로 달려있다. 만약 관심 있으면 이걸 읽어보기

### Reducer

```javascript
type Reducer<S, A> = (state: S, action: A) => S
```

- reducer는 함수다.
- reducer는 accumulation을 받고, value를 받을 수 있다. 그리고 새로운 accumulation을 반환해준다.
- reducer는 값 모음을 단일 value로 바꾸는데에 사용된다.
- reducer가 redux에만 존재하는 개념은 아니다.
- functional programming의 근본 개념이다.
- 리덕스에서는, 합성된 값은 state object이다.
- reducer는 주어진 value와 action을 통해서 새로운 state를 계산한다.
- 반드시 순수함수이어야 한다.
  - 순수함수란 같은 입력에는 무조건 같은 결과값이 나와야 한다는 말이다.
  - 사이드 이펙트도 없어야 한다.
- 이런 점들이 reloading이나 time travel 같은 재미있는 기능이 가능하게 만든다.

- reducer는 리덕스에서 가장 중요한 개념이다.

### Dispatching Function :

```javascript
type BaseDispatch = (a: Action) => Action
type Dispatch = (a: Action | AsyncAction) => any
```

- dispatch 함수는 action이나 비동기 action을 받는 함수다.
- dispatch는 항상 동기적으로 action을 store의 reducer에 보낸다.
- dispatch는 store로 부터 받은 이전 state와 함께 새로운 state를 받기 위해서 action을 store의 reducer로 보낸다.
- dispatch는 action이 plain object이기를 기대한다. reducer에 의해서 읽혀야 하기 때문에.

### Action Creator :

```javascript
type ActionCreator<A, P extends any[] = any[]> = (...args: P) => Action | AsyncAction
```

- action creator는 단순하게 말하자면 action을 만드는 함수다.
- 이 용어를 헷갈리지 말자.
- action은 payload의 정보이고, action creator는 action을 생성해내는 공장이다.

- action creator 를 호출하는 것은 action을 생성한다. 하지만 dispatch 하는 것은 아니다.
- 변경을 원한다면, store의 dispatch 함수를 호출하는 것이 필요할 것이다

---

## Prior Art : 선행기술

리덕스는 여러 기술들이 섞여있다. 이것은 특정 패턴이나 기술과 비슷하다. 하지만 중요한 부분에서 그들과 다르기도 하다.  
이제 우리는 무엇이 비슷하고, 다른지에 대해서 알아볼 것이다.

### Flux :

리덕스는 flux의 몇몇 중요한 특성에서 영향을 받았다. flux처럼, 리덕스도 모델 업데이트 로직을 특정 계층에 집중하도록 규정한다.  
데이터를 직접 변경시키는 대신데, 이 둘은 모두 action이라는 객체에 의해서 모든 변경 사항을 묘사해 줄 것이다.

flux와는 달리 redux에는 dispatcher라는 개념이 없다. 이것은 왜냐하면 event emitter보다는 순수함수에 의존하기 때문이다. 그리고 순수함수는 훨씬 더 구성하는 것이 쉽다.

Unlike Flux, Redux does not have the concept of a Dispatcher. This is because it relies on pure functions instead of event emitters, and pure functions are easy to compose and don't need an additional entity managing them. Depending on how you view Flux, you may see this as either a deviation or an implementation detail. Flux has often been described as (state, action) => state. In this sense, Redux is true to the Flux architecture, but makes it simpler thanks to pure functions.

Another important difference from Flux is that Redux assumes you never mutate your data. You can use plain objects and arrays for your state just fine, but mutating them inside the reducers is strongly discouraged. You should always return a new object, which can be done using the object spread operator or the Immer immutable update library.

While it is technically possible to write impure reducers that mutate the data for performance corner cases, we actively discourage you from doing this. Development features like time travel, record/replay, or hot reloading will break. Moreover it doesn't seem like immutability poses performance problems in most real apps, because, as Om demonstrates, even if you lose out on object allocation, you still win by avoiding expensive re-renders and re-calculations, as you know exactly what changed thanks to reducer purity.

For what it's worth, Flux's creators approve of Redux.
