## Link 태그 
whenever Link components appear in the browser’s viewport, 
Next.js automatically prefetches the code for the linked page in the background. 
By the time you click the link, the code for the destination page will already be loaded in the background, 
and the page transition will be near-instant!
<br>
<br>
링크 태그를 사용하면, 리액트처럼 클라이언트 사이드 렌더링이 이루어진다. 
더군다나 공식 문서에 따르면, 서버사이드 렌더링에 의해서 페이지가 불러와져 있을 때, 
그 페이지 안에 Link 태그가 있다면 background 상에서 이미 해당 페이지를 load 해온다.
때문에 Link를 통해서 페이지를 이동 했을 때는, 이미 해당 페이지가 load되어 있는 상태이기 때문에 상당히 빨리 이동할 수 있다. 
넥스트.js는 알아갈 수록 매력적이라는 생각이 든다. 