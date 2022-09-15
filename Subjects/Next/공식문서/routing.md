# Routing

## Dynamic Import

넥스트는 외부 라이르러리를 import문으로 lazy loading할 수 있도록 지원한다. 그리고 리액트 컴포넌트도 next/dynamic으로 레이지 로딩할 수 있다.  
지연된 로딩은 초기 성능을 향상시키는데에 도움을 준다. 페이지에 렌더링해야 하는 필수적인 자바스크립트 요소들을 줄여줌으로써 그런 일들이 가능해지는 것이다.  
컴포넌트들과 라이브러리들은 번들에 포함되어 있을 때만 사용할 수 있다.

next/dynamic은 React.lazy에서 확장된 것이다.  
Suspense과 같이 사용할 때, 컴포넌트는 Suspense boundary가 완료될 때까지 hydration을 미룰 수 있다.

### Example

next/dynamic을 이용함으로써, 헤더 컴포넌트는 초기 자바스크립트 번들에 포함되지 않을 것이다.  
페이지는 먼저 Suspense에 넘겨진 fallback을 렌더링할 것이고,  
뒤따라서 Suspense boundry가 해결되면 Header component가 렌더링될 것이다.

```javascript
import dynamic from "next/dynamic"
import { Suspense } from "react"

const DynamicHeader = dynamic(() => import("../components/header"), {
  suspense: true,
})

export default function Home() {
  return (
    <Suspense fallback={`Loading...`}>
      <DynamicHeader />
    </Suspense>
  )
}
```

> Note :
>
> > import 안에서, 경로는 반드시 명시적으로 작성되어야 한다. 여기에 template string이나 변수를 사용하면 안된다. 더 나아가서 import는 dynamic call 안에 있어야 한다. 그렇게 함으로써 next.js는 webpack bundles와 modules ids를 특정 dynamic 호출과 매칭시킬 수 있고, 미리 로드 하는게 가능해진다. dynamic은 리액트 렌더링 안에서 사용할 수 없다. 왜냐하면 미리 로드하는 작업을 위해서 모듈의 최상단에 마킹되어야 하기 때문이다. React.lazy와 비슷하다.

만약 리액트 18을 사용한다면, Suspense fallback에 loading 속성을 사용할 수 있다.

```javascript
const DynamicHeader = dynamic(() => import("../components/header"), {
  loading: () => <header />,
})
```

### with named exports

named exports를 동적으로 가져오기 위해서,  
import에 의해서 반환된 Promise로 부터 받아올 수 있다.

```javascript
// components/hello.js
export function Hello() {
  return <p>Hello!</p>
}

// pages/index.js
import dynamic from "next/dynamic"

const DynamicComponent = dynamic(() =>
  import("../components/hello").then(mod => mod.Hello)
)
```

### with no SSR

컴포넌트를 클라이언트 사이트에서 동적으로 렌더링하고자 할 때,  
server-rendering을 하지 않도록 ssr 옵션을 사용할 수 있다.  
이것은 외부 의존성이나 컴포넌트가 브라우저 api나 window에 의존하고 있을 때, 유용하다.

```javascript
import dynamic from "next/dynamic"

const DynamicHeader = dynamic(() => import("../components/header"), {
  ssr: false,
})
```

### with External libraries

이 예시는 fuse search를 위해서 fuse.js를 사용한다.  
이 모듈은 유저가 search input에 입력을 하고난 이후에 load 된다.

```javascript
mport { useState } from 'react'

const names = ['Tim', 'Joe', 'Bel', 'Lee']

export default function Page() {
  const [results, setResults] = useState()

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default
          const fuse = new Fuse(names)

          setResults(fuse.search(value))
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
```
