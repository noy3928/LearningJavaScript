# 브라우저의 전체적인 구조

1.User Interface : 사용자와 인터렉션이 있는 모든 부분.
2.Browser engine : rendering 엔진과 UI 사이에서 명령하는 역할. ui와 rendering engine 사이의 다리역할이라고 생각하면 된다.
3.Rendering engine : 핵심기능은 요청된 content를 display하는 것이다. html, xml 등을 해석하고 최종적인 layout을 만들어낸다.
4.User Interface backend : 이미지나 combo box 같은 것을 painting 할 때 사용된다. 내부적으로는 운영체제에 의해서 동작된다.
5.JS Interpreter : 내장 interpreter에 의해서 모든 종류의 script가 parse 된다.
6.Networking : HTTP 리퀘스트를 수행한다.  
7.Data Storage : 웹저장소

<br>

# 브라우저 동작의 큰 흐름

1. network 파트에서 rendering 엔진에게 요청받은 document를 넘겨준다.
2. rendering 엔진에 의해서 HTML element가 dom nodes로 parse된다. 이것을 토대로 content tree가 만들어진다.
3. 특징 치수와 색깔의 rectangle이 rendered tree에 정렬된다.
4. rendered tree가 만들어지고 나면, 각각의 노드들은 화면에 표시되어야 할 정확한 좌표를 받게 된다.
5. 마지막은 painting이다. 렌더트리의 각각 노드들은 backend layer에 적힌 코드대로 디자인 될 것이다. painting은 다음의 순서를 따른다.
   1)background color가 가장 먼저 칠해진다.
   2)background image가 즉시 따라온다.
   3)border가 할당된다.
   4)children이 쌓인다.
   5)page의 outline이 생성된다.

<br>

# CRP = Critical Rendering Path

- 먼저 브라우저는 네트워크 상에서 데이터를 전달받는다. 전달받은 데이터는 raw data이다.
- 이 raw data는 브라우저가 읽을 수 없다. 그래서 이 raw data는 dom 요소로 바뀌어야 한다. 그렇게 함으로써 브라우저는 데이터를 읽을 수 있다.
- 그러면 raw data가 dom으로 바뀌는 과정을 알아보자.

### raw data가 dom으로 바뀌는 과정

- 먼저 data를 character로 변환한다. UTF-8 (UTF-8이 무엇인지는 추후에 더 찾아볼 수 있도록 하자. )
- 그리고 이렇게 변환한 character를 토큰화한다. (토큰화 과정에 대해서 추후 상세히 찾아보도록. )
- 만약 토큰화가 완료된다면, 그때는 그 요소들을 nodes로 변환한다.
  - 이 nodes들이 Dom을 구성하고 있는 요소이다.

<br>

### Link 태그를 만난다면?

- Link 태그를 만난다면 fetch request가 일어난다.
- css가 대표적인 예이다.
- html data를 dom으로 변환시키는 과정과 똑같은 일이 일어난다.
- data -> character -> tokenizes -> nodes -> CSSOM
- 차이가 있다면 DOM이라고 부르지 않고 CSSOM이라고 부른다.

<br>

### Render Tree

- 이렇게 DOM과 CSSOM이 만들어지고 나면 이것들을 가지고 Render Tree를 만든다.
- 이 Render Tree는 visible한 요소들을 가지고 있다.
  - DOM과 CSSOM 포함
  - 그래서 display:none과 같은 속성을 가진 녀석들은 Render Tree에 포함되지 않는다. 왜냐하면 visible한 요소가 아니기 때문이다.
- Render Tree가 만들어진 그 순간까지는 아직 화면에 아무것도 나오지 않는 상태이다.
- 왜냐?? Render Tree는 현재 visible elements와 attributes를 가지고 있을 뿐이지, 어디에 위치해야하는지를 알려주지는 않기 때문이다.
  - 즉, layout에 대한 정보는 가지고 있지 않다.

### Reflow

- 드디어 Render Tree에도 위치값이 생성된다.
- Reflow가 일어나면 render tree에 있는 각각의 요소들에 위치 정보를 붙이고, 그것이 페이지 어디에 위치하는지를 그리게 된다.
- reflow가 끝나면 그제서야 브라우저는 render할 준비가 끝난다.
- 그러면 이제 paint를 시작하는 것이다.
- reflow : look at the elements and figure out where they go on the page.

<br>

### Paint :

- we know what thins should look like and where they should go. draw some pixels to the screen.
- 이 element들의 모든 위치 정보와 사이즈를 알게 되었으니, 실제로 화면에 그리는 단계이다.
- 그리고 이것을 그릴 때 GPU에게 보내게 된다. (you need to actually send them to the gpu in order to be put onto the screen, right?)

### Composite Layers :

### JS나 funcinality는 언제 실행되나?

- script를 만나면 브라우저는 멈추고, script 파일을 읽을 것이다.
- 이 Script 파일을 읽고 실행하는 동안에는 Dom structure가 멈춘다.
  - 만약 script 파일을 읽다가 에러가 나버리면, 그대로 dom struction도 멈춰버리게 될 것이다.
- 이런 일을 방지하고 싶다면, script를 Html 파일 맨 밑에 위치시키도록 하자.
- 이렇게 맨 밑에 위치시키는 전략을 CRP Optimization이라고 부른다.
