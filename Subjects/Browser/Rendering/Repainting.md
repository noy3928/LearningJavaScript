# Repainting

- repainting이 가장 비용이 비싸다.
- 그리고 애니메이션 중간에 repaint가 일어나면 유저 경험상에 굉장히 해로울 것이다.
- repainting이 일어나면 같은 layer에 있는 요소들은 전부 다 영향을 받는다.

## repainting에서 현재 layer에 영향을 미치지 않도록 하는 방법

- 우리는 어떤 element가 repaint에 영향을 미치는지 알 수 있다.
- 그리고 layer를 만들어내는 방법을 알 수 있다. 이 방법으로, 우리는 repaint가 전체 요소에 영향을 미치지 않도록 만들 수 있는 것이다.
- 기본적으로 2가지 방법이 있다.

- will-change

```css
.my-css {
  will-change: transform;
}
```

이 속성은 브라우저로 하여금 해당 요소가 gpu를 사용할테니까, 최적화를 위한 대비를 미리 해놓으라고 말해준다.

- 3D transformation

```css
.my-css {
  transform: translateZ(0);
}
```

## 레이어를 만들어내는 속성들

- 3D or perspective transform CSS properties
- <video> elements using accelerated video decoding
- <canvas> elements with a 3D (WebGL) context or accelerated 2D context
- Composited plugins (i.e. Flash)
- Elements with CSS animation for their opacity or using an animated transform
- Elements with accelerated CSS filters
- Element has a descendant that has a compositing layer (in other words if the element has a child - element that’s in its own layer)
- Element has a sibling with a lower z-index which has a compositing layer (in other words the it’s - rendered on top of a composited layer)

[참고자료 : https://medium.com/masmovil-engineering/layers-layers-layers-be-careful-6838d59c07fa]
