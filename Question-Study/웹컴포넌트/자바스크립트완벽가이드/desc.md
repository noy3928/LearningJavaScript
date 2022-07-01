최근의 웹 어플리케이션은 순수 html 보다는 리액트나 뷰 같은 프레임워크를 사용한다.  
웹컴포넌트는 이런 프레임워크의 대안으로 브라우저에 네이티브로 추가된 기능이다.  
비교적 최근에 웹 표준에 추가된 세 가지 기술을 활용해, 프레임워크에 의존하지 않고  
자바스크립트와 새로운 태그만 써서 재사용하기 쉬운 UI 컴포넌트를 만든다.

## 웹컴포넌트 사용

웹 컴포넌트는 HTML 태그 이름을 직접 정의한다.  
중요한 것은 이 태그 이름에 반드시 하이픈이 들어가야 한다는 것이다.

```javascript
<script type="module" src="components/search-box.js">
...
<search-box placeholder="Search..."></search-box>
```

- 웹컴포넌트에서는 스스로 닫는 태그를 사용할 수 없다.

- 브라우저는 컴포넌트가 정의되기 전에 웹 컴포넌트 태그를 만날 경우 범용 HTMLElement를 DOM트리에 추가한다. 그리고 나중에 커스텀 요소가 정의되면 그 범용 요소에 알맞게 '업그레이드'한다.

- 웹 컴포넌트에 자식 요소가 있으면 자식 요소는 컴포넌트가 정의되기 전에는 부정확하게 표시된다. 아래의 코드로 자식 컴포넌트를 가릴 수 있다.

```javascript
search-box:not(:defined){
    opacity:0;
    display:inline-block;
    width:300px;
    height:50px;
}
```
