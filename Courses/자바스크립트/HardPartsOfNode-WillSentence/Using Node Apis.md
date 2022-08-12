## Calling Node with Javascript

using http feature of Node to set up an open socket

```javascript
const server = http.createServer()
server.listen(80)
```

여기서 http.createServer는 c++를 위한 커맨드 피처이다.  
네트워크 작업을 세팅하기 위한 것이지. 특히 http와 관련된 네트워크 작업!

여기서 가장 재미있는 부분은 libuv이다.  
libuv의 도움으로 어떤 os에서도 node를 실행할 수 있게 된 것이다.  
Libuv는 c++의 패키지라고 생각해도 된다.

자 그럼이제 이 libuv의 도움으로 컴퓨터 내부의 socket을 열 수 있게 된다.  
소켓을 열어서 인터넷과 소통하기 위한 채널을 연다.

이제 정말 중요한 부분이다.  
http.createSever함수를 호출하면 무엇이 반환되는가?  
server가 그 즉시 반환된다.
이 server는 굉장히 많은 메서드들로 구성되어 있다.
예를 들어서, listen과 같은 메서드도 있다.

그리고 이 listen 메서드를 통해서 port를 듣는다.  
80이라는 값을 넘겨주었고, 이제 이 80번을 node c++ feature에 넘겨준다.  
그러면 node c++ feature는 이 80이라는 값을 컴퓨터에게 넘겨주고,  
그 80이라는 값에 해당하는 포트의 문을 연다.

이 포트를 통해서 트위터에서 메시지를 받았다.  
libuv를 통해서 노드는 메시지를 받는다.
