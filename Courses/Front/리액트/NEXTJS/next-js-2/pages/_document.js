import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

/*
이것은 
서버에서만 작용하는 페이지이다. 
화면에 보여 줄 요소들은 여기서 작업하면 안된다. 
*/