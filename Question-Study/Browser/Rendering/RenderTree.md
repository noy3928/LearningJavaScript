## Render Tree

![renderTree]("./img/renderTree.png")

- the render tree has a one-to-one mapping with the visible objects on the page.
  - so, not hidden object.
  - yes, to pseudo elements(:after, :before)
- there might be multiple rules that apply to a single element. we need to figure that all out here.

## style calculations

- 이 렌더 트리에서 일어나는 일 : style calculation
- the browser figures out all of the styles that will be applied to a given element.
- 그리고 이 style calculation은 2가지 작업을 포함한다.
  - figuring out which rules apply to which elements.
  - figuring out how what the end result of an element with multiple rules is.

## styling elements :

- selector matching

- this is the process of figuring out what styles apply to an element.

- the more complicated you get, the longer this takes.

- 선택자를 이용할 때, 복잡해질 수도 있는데, BEM 원칙을 지키면서 하기를 권장한다.
- browsers read selectors from right to left.
- the less selectors you use, this faster this is going to be.

- when mutiple selectors apply to an element. the browser needs to figure out who wins.

- the easiest way to make this faster is to not do io.

## render tree 구축 단계에서 성능 향상을 위한 방법

- reduce the amout of unused css that you're shipping
  - the less styles you have, the less there is to check.
- reduce the number of styles that effect a given element.

## 이 단계가 끝나면?

이 단계가 끝나면 layout - reflow 단계로 넘어가게 될 것이다.  
reflow : look at the elements and figure out where they go on the page.
