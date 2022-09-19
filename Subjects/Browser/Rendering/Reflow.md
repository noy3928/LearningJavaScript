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

## optimization#3 : 한번만 측정하기

계산을 반복하고 있는 부분이 반복되고 있지는 않는지 확인해보자.  
만약 그렇다면 변수에 저장해놓고 재사용하기를 권장한다.

최적화되지 않은 코드 :

```javascript
let list = document.getElementById("list")
let listItems = Array.from(list.children)

for (let i = 0; i < listItems.length; i++) {
  let listParentHeight = list.parentElement.offsetHeight // No! : calculate parent height in every loop
  listItems[i].style.marginTop =
    Math.floor(listParentHeight / listItems.length - 10) + "px"
}
```

최적화된 코드 :

```javascript
let list = document.getElementById("list")
let listParent = list.parentElement
let listParentHeight = listParent.offsetHeight // Yes! : store height of parent element
let removedList = listParent.removeChild(list) // Yes! : remove list for batch editing
let listItems = Array.from(removedList.children)

for (let i = 0; i < listItems.length; i++) {
  listItems[i].style.marginTop =
    Math.floor(listParentHeight / listItems.length - 10) + "px"
}
```

## optimization#4 : 요소에 변경이 자주 일어난다면, fixed/absolute position을 사용하기

만약 사이트 내의 특정 요소가 그들의 레이아웃을 자주 변경시킨다면, 다른 요소의 레이아웃의 리플로우도 일으키게 될 것이다.

예를 들어서, 요소의 크기가 움직이는 애니메이션이 이루어진다면, position:fixed 나 position: absolute를 사용하는 것이 훨씬 좋다. 이런 방식으로 애니메이션이 이루어진다면 요소가 주변에 있는 요소에게 영향을 미치지 않을 것이다. 덕분에 원치 않는 reflow가 일어나는 것을 줄일 수 있다.

## optimization#5 : 레이아웃을 위해서는 flex box를 이용하기

float보다 flex box의 성능이 우수하다. float 보단 flex box를 사용하자.

## optimization#6 : display보단 visibility를 이용하기

만약 특정 요소를 보여줬다가 감추는 작업을 해야한다면, display: none - display: block을 사용하기보다는, visibility:hidden - visibility : visible을 이용하자.

이렇게 해야하는 이유가 있다. visibility를 이용해 화면에서 요소를 감추면, DOM layout에는 여전히 공간을 차지하는 중이다.  
이렇게하면 요소의 넓이나 높이가 따로 변경되는 것이 아니기 때문에 브라우저가 recalculate할 필요가 없어진다.

만약 요소를 화면에서 아예 삭제해야하는 경우가 아니라면 그냥 visibility : hidden을 이용하도록하자.

## optimization#7 : js를 통해 style을 변경할거라면 한번에 다하기

No Good :

```javascript
element.style.left = left //triggers reflow
element.style.top = top // triggers reflow
```

Good :

```javascript
element.style.cssText += "left: " + "left" + "px; top: " + top + "px;" // triggers reflow once
```

## optimization#8 : js를 통해 style을 변경할거라면 한번에 다하기

---

## 리플로우 비용을 줄이기 위한 구글의 가이드라인 :

1. 불필요한 DOM 심도를 줄입니다. DOM 트리의 수준 하나를 변경하면 트리의 모든 수준, 즉 위로는 루트, 아래로는 수정된 노드의 하위 요소에 이르기까지 모두 변경될 수 있습니다. 이에 따라 리플로우를 실행하는 데 더 많은 시간이 걸리게 됩니다.
2. CSS 규칙을 최소화하고 사용되지 않는 CSS 규칙을 삭제합니다.
3. 애니메이션과 같이 복잡한 렌더링 변경이 필요한 경우 흐름 밖에서 변경합니다. 변경할 때는 절대 위치나 고정 위치를 사용합니다.
4. 불필요하고 복잡한 CSS 선택기, 특히 하위 요소 선택기는 사용하지 않습니다. 이 경우 선택기를 일치시키기 위해 더 높은 CPU 처리량이 필요합니다.

## 리플로우에 영향을 미치는 요소들 :

리플로우에 영향을 미치는 것들은 사이즈나 위치에 관련된 것들이다.  
그 외의 css요소들은 repaint 과정에 영향을 미칠 것이다.

Changes in properties such as ‘display’, ‘floats’, resize the browser, insert new nodes… will result in a recalculation of positions and dimensions of elements, a “reflow”. On the other hand, certain css properties will cause “repaints” (change of colors, changes of assets, application of shadows …).

### 최적화를 위한 자료 :

[https://cresumerjang.github.io/2019/06/24/critical-rendering-path/]
