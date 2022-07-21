# Reflow or Layout

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
