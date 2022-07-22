# css와 js의 성능비교

- css기반의 애니메이션과 web animations은 컴포지터 스레드에 의해서 실행된다.
- 브라우저의 메인 스레드는 styling, layout, painting, js를 실행한다. (그렇다면 js의 애니메이션을 실행하면 main thread가 동작하는 것인가?)
- 아무튼 컴포지터 스레드는 메인 스레드와 분리되어있기 때문에, 메인 스레드의 무거움과는 상관없이 실행될 수 있다.

- 그리고 transform이나 opacity를 변경시키는 것은 컴포지터 스레드에 의해서 실행된다.

- 만약에 어떤 애니메이션이 paint, layout 같은 작업들을 불러일으킨다면 main thread는 열심히 일해야 할 것이다.

- css 애니메이션은 전반적으로 좋은 성능을 보인다. 브라우저마다 다르긴 하겠지만. 그치만 js의 경우에는 개발자가 그것을 얼마나 최적화 했느냐에 따라서 다르다. 경우에 따라서는 css-based 애니메이션보다 빠를 수도 있다.

### js를 사용할지 css를 사용할지는 전적으로 사용자에게 달려있다.

- Using CSS or Javascript for animation is highly dependent on what you are trying to do. Javascript can be very powerful but is completely unnecessary if all you are doing is something like fading in a pop up window. Most of the time just using CSS is enough, but complicated animations can be difficult to do without using Javascript. If you decide to use Javascript, make sure to pick a suitable library which does not conflict with other libraries you may already be using.
