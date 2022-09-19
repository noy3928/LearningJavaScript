# DOMContentLoaded, load, beforeunload, unload 이벤트

### HTML 문서의 생명주기엔 다음과 같은 3가지 주요 이벤트가 관여한다.

- **DOMContentLoaded** – 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생합니다. 이미지 파일(<img>)이나 스타일시트 등의 기타 자원은 기다리지 않습니다.
- **load** – HTML로 DOM 트리를 만드는 게 완성되었을 뿐만 아니라 이미지, 스타일시트 같은 외부 자원도 모두 불러오는 것이 끝났을 때 발생합니다.
- **beforeunload/unload** – 사용자가 페이지를 떠날 때 발생합니다.
