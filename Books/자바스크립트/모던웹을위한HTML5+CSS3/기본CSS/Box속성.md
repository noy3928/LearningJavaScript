# Box 속성

### box-sizing 속성

이전에 width 속성과 height 속성은 글자를 감싸는 영역의 크기를 지정하는 스타일 속성이라고 이야기했다. box-sizing 속성은 이러한 공식을 변경할 수 있는 CSS3속성이다.

box-sizing 속성은 width 속성과 height 속성이 차지하는 범위를 지정한다.

<br>

### content-box

content-box 키워드는 기본으로 적용되는 키워드이다.
이 키워드를 적용하면 width 속성과 height 속성이 글자가 들어가는 영역의 크기를 지정하게 된다.  
따라서 사각형의 전체 너비는 다음과 같은 공식으로 표기할 수 있다.  
박스 너비 = width 속성 + 2 x (margin 속성 + border속성 + padding 속성)

### border-box

width 속성과 height 속성이 테두리를 포함한 영역의 크기를 지정하게 만든다. 따라서 그림 4-28 노란색 사각형의 전체 너비와 높이는 다음과 같은 공식으로 표기할 수 있다.

박스 너비 = width 속성 + 2 x margin 속성
