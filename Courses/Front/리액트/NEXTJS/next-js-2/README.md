넥스트 js는 기본적으로 모든 페이지를 사전렌더링한다.  

프리렌더린은 더 좋은 퍼포먼스를 낸다. 
1.정적 생성과 
2. 서버사이드 렌더링 

언제 html 파일을 생성하는가? 

[정적 생성]

* 프로젝트가 빌드하는 시점에 html 파일들이 생성 
* 모든 요청에 재사용 
* 퍼포먼스 이유로, 넥스트 Js는 정적 생성을 권고 
* 정적 생성된 페이지들은 CDN에 캐시 
* getStaticProps / getStaticPaths

[서버 사이드 렌더링]은 매 요청마다 html을 생성한ㄷ. 
- 항상 최신 상태를 유지한다. 
- getServerSideProps

이 둘은 어떻게 구분? 
유저의 움직임이 어떻게 되는지를 파악하고 구분해야 한다. 

<br>

넥스트 js는 기본적으로 모든 페이지를 프리렌더링한다. 

정적 생성은 빌드시에 미리 생성하는 것. 

서버 사이드 렌더링은 요청을 하면 그때 만들어서 보여주는 것이다.  


<br>

CDN?? 

