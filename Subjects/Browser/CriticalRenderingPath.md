# CRP

[Critical Rendering Path](https://developer.mozilla.org/ko/docs/Web/Performance/Critical_rendering_path)
[101 Javascript Critical Rendering Path](https://indepth.dev/posts/1498/101-javascript-critical-rendering-path)

- CRP는 브라우저가 HTML, CSS, JS를 화면에 픽셀로 변환하는 일련의 단계를 말한다.
  - CRP는 DOM + CSSOM, 렌더트리 그리고 레이아웃을 포함한다.

HTML 파싱 -> JS 만나면 JS파일 요청 -> CSS 파싱 -> DOM 생성 -> CSSOM 생성 -> 렌더트리 구축 -> 레이아웃 -> 리페인트

- Critical Rendering Path는 브라우저가 HTML 페이지를 받아서 유저의 화면에 보여주기까지의 핵심 단계들을 말하는 것이다.
- Remember, the critical rendering path is all about HTML, CSS and Javascript.
  - even though we must try and get the images displayed as quickly as possible, they are not going to block the initial rendering.
  - images are not treated as critical resources

---

## DOM

- DOM 구성은 점진적으로 증가한다.
- HTML response -> token -> node -> DOM tree
- Node : contain all relevant information about the HTML element.
  - The information is described by token.
- DOM tree : are consists for Nodes and it is based on token hierarchy.
- 많은 수의 node는 CRP에서 시간을 잡아먹을 것이다.

<br>

## CSSOM

- CSSOM : DOM을 스타일링 하기 위한 페이지의 모든 스타일 정보를 포함한다.
- CSS는 렌더링을 막는다.
  - DOM은 점진적으로 증가하지만.
  - 브라우저는 모든 CSS를 처리하고 수신할 때까지 페이지 렌더링을 막는다.
  - 렌더링을 막는 이유 : CSS는 규칙을 덮어 쓸 수 있기 때문에 이것이 완료될때까지 콘텐츠를 렌더링할 수 없다.
    - 규칙을 덮어 쓴다는 말에 대한 설명 : CSS의 C는 Cascade이다. CSS의 규칙은 아래로 종속된다는 사실을 기억해야 한다. 이 말은 아래에 있는 규칙들이 이전의 규칙들에 덮어쓰여질 수 있다는 것이다. 덮어쓰여질 스타일들을 화면에 렌더링할 수는 없기 때문에 완전히 분석될 때까지 렌더 트리를 생성하는데 사용할 수 없다.

<br>

## Render Tree

- 렌더 트리는 콘텐츠와 스타일 둘 다 캡쳐한다.
  - Render Tree : DOM + CSSOM
  - 이 트리를 구성하기 위해 브라우저가 하는 일 :
    - DOM 트리의 root에서 시작해 모든 노드를 확인하면서 어떤 CSS 규칙을 첨부할지 결정한다.

<br>

## Layout

- 요소의 너비는 부모 너비의 기본값의 100%이다.
- body는 뷰포트 너비의 100%를 의미하는 너비이다.
- 레이아웃 성능은 DOM의 영향을 받는다. 노드의 수가 많을수록 레이아웃은 더 길어진다.

<br>

## Paint

- 마지막 단계를 화면에 픽셀을 그리는 단계다.
- 레이아웃이 나타나기 시작하면, 화면에 픽셀을 그릴 수 있다.

---

<br>

> What is Render-Blocking?
>
> > Rendering Blocking resource is a component that would not allow the browser to render the entire DOM tree until the given resource is completely loaded.

> What is Parser Blocking?
>
> > The browser pauses execution and the construction of the DOM tree when javaScript code needs to be downloaded and executed. The moment the js code is executed, the construction of DOM tree continues. => this is why js is an expensive resouce

> domContentLoaded
>
> > it is fired when a HTML DOM is completely parsed, and loaded. The event does not wait for images, subframes or even stylesheets to be completely loaded. The only target is for the Document to be loaded. It is possible to add events in the window interface, to see if the Dom is parsed, and loaded or not. Your event listener will be as follow:

<br>

- Critical Resource : All resources which can block the rendering of the page.
- Critical Path Length : Total number of round trips, required to fetch all the critical resources required for building the page.
- Critical Bytes : Total number of bytes transferred as a part of completing and building the page.
