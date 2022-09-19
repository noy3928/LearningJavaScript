- 코드 분할은 런타임에 여러 번들을 동적으로 만들고 불러오는 것으로 Webpack, Rollup과 Browserify (factor-bundle) 같은 번들러가 지원하는 기능입니다.

- 코드 분할은 여러분의 앱을 “지연 로딩” 하게 도와주고 앱 사용자에게 획기적인 성능 향상을 하게 합니다. 앱의 코드 양을 줄이지 않고도 사용자가 필요하지 않은 코드를 불러오지 않게 하며 앱의 초기화 로딩에 필요한 비용을 줄여줍니다.

## Import()

```javascript
import { add } from "./math"
console.log(add(16, 26))
```

```javascript
import("./math").then(math => {
  console.log(math.add(16, 26))
})
```

<br>

## React.Lazy

before

```javascript
import OtherComponent from "./OtherComponent"
```

after

```javascript
const OtherComponent = React.lazy(() => import("./OtherComponent"))
```

- React.lazy 함수를 사용하면 동적 import를 사용해서 컴포넌트를 렌더링 할 수 있다.

- lazy 메서드는 import를 호출하는 함수를 인자로 가진다.
- 이 함수는 Promise 객체를 반환한다. 그리고 그 프로미스는 리액트 컴포넌트를 default export로 가진 모듈 객체이어야 한다.
- 이렇게 받아온 lazy 컴포넌트는 Suspense 컴포넌트의 자식으로 렌더링 되어야 한다.
- Suspense 는 lazy 컴포넌트가 로드되길 기다리는 동안 예비 컨텐츠를 보여줄 수 있다.

<br>

## Error boundaries

```javascript
import React, { Suspense } from "react"
import MyErrorBoundary from "./MyErrorBoundary"

const OtherComponent = React.lazy(() => import("./OtherComponent"))
const AnotherComponent = React.lazy(() => import("./AnotherComponent"))

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
)
```

- 에러 바운더리 컴포넌트로 lazy 컴포넌트를 감싸면, 네트워크 에러가 발생해서 모듈 로드에 실패했을 때 에러를 표시할 수 있다.

<br>

## Named Exports

- lazy는 default export만 지원한다.

```javascript
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```

```javascript
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js"
```

```javascript
// MyApp.js
import React, { lazy } from "react"
const MyComponent = lazy(() => import("./MyComponent.js"))
```
