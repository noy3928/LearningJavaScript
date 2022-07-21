## What is Reflow or Layout :

- reflow is a user-blocking operation that computes the layout of the document. A reflow on an element is the calculation of its dimensions and position in the document.

- layout is really expensive .

- whenever the geometry of an element changes, the browser has to reflow the page. (browser implementations have different ways of optimizing this, so there is no point sweating the details in this case.)

- a reflow of an element causes a reflow of its parents and children.

## Tasting Notes :

- A reflow is a blocking operation. Everythis else stops.
- It consumes a decent amout of CPU.
- It will definitely be noticeable by the user if it happens often.

## Lists of causes a reflow

- resizing the window.
- changing the font
- content changes.
- adding or removing a stylesheet.
- adding or removing classes.
- adding or removing elements
- chaging orientation.
- calculating size or position
- changing size or position
- inserting/removing/updating an element in the DOM
- Modifying content on the page, the text in an input box.
- Moving a DOM element
- Animating a DOM element
- Taking measurements of an element
- Changing a CSS style
- Setting a property of the style attribute
- Changing the class of an element
- Adding/removing a style sheet
- Resizing the window.
- Scrolling
- Changing the font
- Activation of CSS-pseudo classes, such as :hover

reflow - repainting을 일으키는 css 요소 [https://csstriggers.com/]
js 요소 [https://gist.github.com/paulirish/5d52fb081b3570c81e3a]

## reflow 눈사태 효과

- reflow는 눈사태와 같아서, 특정 요소에 일어난 reflow가 또 다른 요소의 reflow를 불러온다.

이런 눈사태효과가 불러오는 영향에는 다음과 같은 것들이 있다 :

- requires CPU power
- increases first meaningful paint time
- increases first contentful paint time
- creates a bad user experience because it's a blocking operation

## How can you avoid reflows?

- change classes at the lowest level of the DOM tree.

- Avoid repeatedly modifying inline styles.
- Trade smoothness for speed if you're doing an animation in JS.
- Avoid table layouts.
- Batch DOM manipulation.
- Debounce window resize events.

---

rendering pipeline에서 두번째가 많은 비용이 드는 것이 reflow이다.  
첫번째는? paiting.

---

## optimization#1 : HTML element에 대한 수정

만약에 DOM element를 여러번 수정해야 할 일이 있다면,  
해당 DOM를 지우고 난 이후에 수행하도록하자.

```javascript
let element = document.getElementById("example-element")
let parentElement = element.parentElement
let removedElement = parentElement.removeChild(element)
```

element를 지워줬다면, 스타일을 더해준 다음에 다시 DOM에 합쳐주자.

```javascript
removedElement.style.opacity = "0.5"
removedElement.style.padding = "20px 10px"
removedElement.style.width = "200px"
parentElement.appendChild(removedElement) // triggers reflow
```

또 다른 대안이 있다면,  
hide했다가 show하는 방법이다.

```javascript
let element = document.getElementById("example-element")
element.style.display = "none" // hide the element, triggers reflow
element.style.opacity = "0.5"
element.style.padding = "20px 10px"
element.style.width = "200px"
element.style.display = "block" // show the element again, triggers reflow
```

## optimization#2 : 가능하면 필요한 녀석에 한해서만 변경을 일으키기

reflow가 눈사태 효과를 불러오는 탓에, 가능하면 reflow를 일으키지 않는 방향으로 사용하는 것을 추천한다.

만약 정 사용해야 한다면, css style을 토글에 적용하고 싶다고 가정해보자.  
이런 상황에서 가능하면 필요한 요소에 한해서만 변화를 만들고, 그 부모에서부터 변화를 만드는 행위를 하지 마라. 이렇게만 해도 약간의 성능상 이점을 얻을 수 있다.

## optimization#3 : 가능하면 필요한 녀석에 한해서만 변경을 일으키기
