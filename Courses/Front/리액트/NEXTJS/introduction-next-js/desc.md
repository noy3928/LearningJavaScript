## getStaticProps()

이 함수는 브라우저에서 실행되지 않을 것이다.  
오직 서버 사이드에서만 실행되는 함수이다.   
그렇기 때문에 빌드타임에 실행되는 코드라고 할 수 있다. 

<br>

## getStaticPaths()

이 함수는 getStaticProps와 함께 사용해야 한다.  


<br>

## hydrate 

hydrate는 정적 파일인 html이 먼저 업로드 되고 난 이후,  
리액트의 js 코드가 html의 dom요소와 매칭되는 과정을 말하는 것이다.  

