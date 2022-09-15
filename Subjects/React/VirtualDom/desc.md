## Virtual Dom

- 앱을 실행하면 리액트는 가상돔을 만든다. 이것은 실제돔을 카피한 것이다. state가 변경될 때마다, 실제 돔을 변경시키는 대신에, 리액트는 새로운 가상돔 전체를 렌더링 시킬 것이다. 그러고나면 이것은 비교할 것이다. 이전의 가상돔과 새로 생긴 가상돔을. 그렇게 함으로써 변화를 찾아낼 것이고, 오직 그 변화만이 실제 돔에 변화를 불러일으킬 것이다. 이런 방법으로, 실제돔에는 정말 최소한의 변화만 요구되면서 전체 ui가 리렌더링 되는 것이다.
- 때문에 가상돔을 이용하면 딱 변화가 필요한 녀석만 변화시킨다는 말은 이것이 전체ui를 렌더링 시켜야한다는 접근을 극복해낸 것이라고 할 수 있다. (왜 전체 ui를 렌더 시키냐? 이것은 앵귤러가 사용하는 dirty checking을 사용하지 않기 때문이다. 이것은 observable한 방식을 사용하는데, state의 변화가 '관찰'되면 Ui 전체를 변경시키는 패턴을 사용하기로 한 것이다. 그런데 이렇게 했을 때 전체를 변화시키는 것은 한계가 있으니 가상돔을 이용하고, diff 알고리즘을 이용해서 최소한의 것만 변화시키도록 한다는 것이다.) -> 아 이 포인트에서 나의 고민이 해결된 것 같다. 실제로 가상돔을 사용하는 것이 성능이 좋다는 말은 애초에 실제돔을 조작하는 것과 비교해서 그렇다는 것이 아니라, 리액트가 state사용과 돔 조작하는 방식을 선택했을 때 dirty checking이 아니라 diff 알고리즘을 사용하기로 했는데 그 방법을 사용하면 state가 변경될 때마다 전체 돔을 변경시켜줘야 한다는 것이다. 그런데 그렇게하면 비효율적이니까 virtual dom을 사용한다는 것이다.
- 아니 그렇다면 여기서 또 궁금해지는 것은 왜 dirty checking 방식을 리액트는 사용하지 않기로 선택한 것인가? dirty checking에는 무슨 문제가 있는건가?

## 가상돔을 통해서 렌더링이 일어나는 것과 실제돔을 조작하는 것의 성능에는 실제로 어떤 차이가 있는가?

내가 궁금해진 지점은 이것이다. 좋다 가상돔을 통해서 어떤 요소가 변경이 이루어졌는지 확인을 했다.  
그러면 그 요소만 변경해서 실제돔에 적용시켜준다고 했는데,  
똑같이 내부적으로 실제돔에 적용시켜줄 때는 dom api를 사용할 것이 아닌가??  
그런데 이게 어떻게해서 가상돔이 성능이 더 좋다고 말할 수 있는 것이지?  
실제로 돔에 적용 시킬때는 똑같이 reflow와 repaint가 일어나는 것이 아닌가??

## Dirty Checking 보다 observable이 더 나은 이유 :

- Dirty checking is slower than observables because you must poll the data at a regular interval and check all of the values in the data structure recursively. By comparison, setting a value on the state will signal to a listener that some state has changed, so React can simply listen for change events on the state and queue up re-rendering.

## virtual dom의 장점 :

- 이것을 사용하면 굳이 성능을 고려한 돔 조작을 코드를 작성하기 위해서 머리를 싸멜 필요가 없다.

We just declare exactly what we want and React/virtual-dom will work out how to make your scene look like this. We don't have to do manual DOM manipulation or get confused about previous DOM state. We don't have to re-render the entire scene either, which could be much less efficient than patching it.

- virtual dom을 렌더링 하는 것은 훨씬 빠르다. 이것은 screen에 렌더링 될 필요가 없기 때문이다. virtual dom은 그냥 메모리 상에 존재하는 자바스크립트의 객체일 뿐이다.

---

- 언제 리렌더하는가 ? : data가 dirty해진 것을 관찰했을 때
- 어떻게 효율적으로 리렌더하는가? : 실제 dom patch를 생성하기 위해 가상돔을 사용함으로써
- 리액트에서는 각각의 컴포넌트들이 state를 가진다. 그리고 이 state는 여타 다른 mvvm 스타일 라이브러리에서 볼 수 있듯이 관찰 가능한 대상이다. 본질적으로, 리액트가 화면을 리랜더링해줘야 하는 때를 알 수 있는 이유는 데이터가 변경되는 것을 관찰할 수 있기 때문이다. dirty checking은 observable보다 느리다. 왜냐하면 이것은 데이터를 정기적으로 직접 확인하고, 데이터 구조의 모든 값을 재귀적으로 검사하기 때문이다. 그에 비해서, state에 값을 저장해두면 이것은 listener에게 신호를 보내줄 것이다. 몇몇 state가 변경되었다고. 그러면 리액트는 아주 간단하게 변화를 들을 수 있을 것이다. 그리고 순차적으로 리렌더링 시키면 된다.
- 가상돔은 돔의 효율적인 리렌더링을 위해서 사용된다. 이것은 dirty checking과는 별로 상관없다. dirty checking을 사용하면서든 사용안하든 virtual dom을 이용해서 리랜더링을 할 수 있다. 두 가상돔을 비교할 때 약간의 오버헤드가 발생하는 것은 사실이다. 하지만, 가상돔의 역할은 업데이트 되어야 할 녀석이 무엇인지이지 데이터가 변경되었는가 아닌가가 아니다. 사실 diff algorithm은 dirty checker 그 자체이지만, 이것은 dom이 변경되었는지를 확인하기 위해서도 사용된다.
- state가 변경되었을 때만 virtual tree를 리렌더하는 것이 목적이다. 그런 이유로 상태가 변경되었는지 관찰 가능한 대상을 사용하는것 (state)은 불필요한 re-render를 방지하기에 효율적인 방법이라고 할 수 있다. 아무 변화도 없다면, 아무일도 일어나지 않을 것이다.
- 가상돔은 아주 nice하다. 왜냐? 우리로 하여금 마치 전체 화면을 리랜더링 할 것처럼 코드를 작성하게 하기 때문이다. 가상돔 diff/patch 알고리즘이 최상의 솔루션은 아닐 수도 있지만, app을 화면에 표현할 수 있는 좋은 방법을 제공한다. 이제 가상돔을 사용하면 전체 화면을 다시 렌더링 할 필요도 없다.

[ 참고자료 : https://github.com/FEDevelopers/tech.description/wiki/%EA%B0%80%EC%83%81-%EB%8F%94%EA%B3%BC-%EB%8F%94%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90]

[참고자료 : https://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode]

[참고자료 : https://calendar.perfplanet.com/2013/diff/]

[참고자료 : https://stackoverflow.com/questions/61245695/how-exactly-is-reacts-virtual-dom-faster]

[참고자료 : https://www.geeksforgeeks.org/explain-dirty-checks-in-react-js/]

[참고자료 : https://dev.to/karthikraja34/what-is-virtual-dom-and-why-is-it-faster-14p9]

[참고자료 : https://javascript.plainenglish.io/why-is-the-virtual-dom-so-fast-cf7630643349]

[참고자료 : https://www.optasy.com/blog/how-react-virtual-dom-works-why-it-so-much-faster-real-dom]

[참고자료 : https://www.reddit.com/r/reactjs/comments/mo4g0t/why_virtual_dom_is_considered_faster_that/]

[참고자료 : https://www.codecademy.com/article/react-virtual-dom]
