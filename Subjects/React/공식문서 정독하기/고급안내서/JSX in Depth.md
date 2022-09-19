# JSX in Depth

근본적으로 JSX는 단지 React.createElement(component, props, ...children) 함수를 위한 문법적 설탕에 불과하다.

```javascript
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

이런 코드는

```javascript
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me")
```

이렇게 컴파일된다.

<br>

## React Element 타입을 특정하기

JSX 태그의 첫번째 파트는 react element 타입을 결정하는 것이다.

대문자로 시작하는 JSX태그는 리액트 컴포넌트를 말하는 것이다.  
이런 태그들은 이름 있는 변수에 직접적으로 참조되도록 컴파일된다.

### React must be in scope

jsx가 react.createElement를 호출하도록 하기 때문에,  
리액트 라이브러리는 반드시 JSX코드와 같은 스코프 안에 있어야 한다.

예를 들면, 아래의 두 import는 필수적인 것들이다.  
React와 CustomButton이 직접적으로 참조되지 않음에도 불구하고.

```javascript
import React from "react"
import CustomButton from "./CustomButton"

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />
}
```

만약 당신이 자바스크립트 번들러를 사용하지 않고, script 태그로부터 로드된 리액트를 사용한다면
이것은 이미 React가 글로벌 스코프에 있다는 것이다.
때문에 리액트를 별도로 불러올 필요는 없다.

### Using Dot Notaion for JSX Type

jsx안에서 dot-notation도 사용할 수 있다.  
많은 리액트 컴포넌트를 단일한 모듈에서 exports하고 있다면, 이것은 편리한 방법이 될 수 있다.

### User-defined Components Must Be Capitalized

만약 소문자로 엘리먼트 타입을 적는다면 이것은 단지 문자열로만 인식될 것이다.  
엘리먼트 타입을 적을 때는 대문자로 시작해야한다.  
그래야 컴포넌트에 대응하는 녀석을 가져올 수 있다.

### Choosing the Type at Runtime

리액트 엘리먼트로 일반적인 표현식을 사용할 수는 없다.  
만약에 그렇게 사용하고 싶다면, 대문자화 된 변수에 할당을 먼저해야한다.  
이것은 종종 props에 기반해서 다른 컴포넌트를 렌더링하고자 할 때, 문제가 발생한다.

```javascript
import React from 'react'
import {PhotoStory, VideoStory } from "./stories";

const components = {
    photo : PhotoStory,
    video : VideoStory,
};

function Story(props){
    return <component[props.storyType] story={props.story}/>
}
```

이것을 고치기 위해서 대문자로 된 변수에 먼저 할당해야 한다.

```javascript
import React from "react"
import { PhotoStory, VideoStory } from "./stories"

const components = {
  photo: PhotoStory,
  video: VideoStory,
}

function Story(props) {
  const SpecificStory = components[props.storyType]
  return <SpecificStory story={props.story} />
}
```

<br>

## Props in JSX

```javascript
function NumberDescriber(props) {
  let description
  if (props.number % 2 == 0) {
    description = <strong>even</strong>
  } else {
    description = <i>odd</i>
  }
  return (
    <div>
      {props.number} is an {description} number
    </div>
  )
}
```

### string literals

아래 두가지는 같은 것이다.

```javascript
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

### 배열로도 반환 가능한 컴포넌트

ㅈ

```javascript
render(){
    return[
        <li key="A">First item</li>,
        <li key="B">First item</li>,
        <li key="C">First item</li>
    ]
}
```
