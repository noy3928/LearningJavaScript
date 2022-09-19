# Introduction

- Link가 viewport안에 들어오면, 기본적으로 데이터를 prefetch할 것이다. Static generation을 이용하는 페이지인 경우. 만약 server-rendered를 이용하고 있는 페이지라면 prefetch를 하지 않을 것이다.

# Imperatively

- useRouter를 이용하는 것이 imperatively
- 기본적으로 Link를 사용할 것을 권장하는 뉘앙스인 것 같다.

<br>

# Shallow Routing

Shallow 라우팅은 데이터 fetching을 다시하는 일 없이 URL을 바꿀 수 있게 해준다.  
getServerSideProps, getStaticProps, and getInitialProps을 포함해서.

아마 업데이트된 pathname과 query를 router object를 통해서 받게 될 것이다.  
state를 잃어버리는 일 없이.

shallow routing을 하기 위해서,  
shallow option을 true로 만들어라.  
다음 예시를 보자.

```javascript
import { useEffect } from "react"
import { useRouter } from "next/router"

// Current URL is '/'
function Page() {
  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push("/?counter=10", undefined, { shallow: true })
  }, [])

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}

export default Page
```

URL은 /?counter=10로 업데이트 될 것이고, 페이지는 변하지 않을 것이다.  
오직 route의 state만 변하게 될 것이다.
또한 componentDidUpdate를 통해서 URL이 변화되는 것을 관찰할 수 있다.

```javascript
componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  // verify props have changed to avoid an infinite loop
  if (query.counter !== prevProps.router.query.counter) {
    // fetch data based on the new query
  }
}
```

### Caveat

shallow routing은 현재 페이지 안에서 url 변경하는 것에 대해서만 효과가 있다.  
예를 들어서, 한번 가정을 해보자.  
우리가 pages/about.js라는 페이지를 가지고 있고,  
이것을 실행하려고 한다고 :

```javascript
router.push("/?counter=10", "/about?counter=10", { shallow: true })
```

저것은 새로운 페이지 이기 때문에, 현재 페이지는 unload되고,  
새로운 것이 load 될 것이고,  
shallow routing을 할 거라고 요청했음에도 불구하고,  
새로운 데이터가 fetching 되기를 기다릴 것이다.

shallow routing이 미들웨어와 사용될 때,  
이것은 새로운 페이지가 현재 페이지와 매칭 될 것이라는 것을 보장하지 않을 것이다.  
이것은 미들웨어가 동적으로 재작성하는 것이 가능하기 때문이고,  
클라이언트 사이트에서 데이터를 fetch하지 않고서는 보장받을 수 없기 때문에  
shallow가 skip된다.  
그래서 shallow route change는 반드시 항상 shallow로 대해야한다.

# Dynamic Import

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
