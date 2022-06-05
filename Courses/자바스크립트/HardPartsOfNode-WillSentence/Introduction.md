# Node overview

웹사이트를 실행시키기 위한 data와 코드들.
이것들은 어디서 오는 것일까?  
서버에게서 오는 것이다. 그리고 그 서버란 또 다른 컴퓨터와 같은 의미다.

이 서버라는 컴퓨터는 다양한 유저의 컴퓨터로부터,  
메시지를 받는다.
웹사이트 정보를 보내줘,
유저 정보를 보내줘,
tweets를 보내줘.

클라이언트 입장에서 보내는 그 메시지란,  
특정 코드이다.  
그런데 여기서 서버가 사용하는 언어가 있을텐데  
무엇이 있을까?  
PHP, JAVA, RUBY, C, JS

메시지를 보내는 입장은 클라이언트라고 한다.  
메시지를 받은 서버는 컴퓨터에서 다루는 많은 자원들에 접근하고 사용해야한다.

- network socket
- filesystem
- cpu
- kernel

근데, 문제가 있다.  
자바스크립트는 이런 컴퓨터의 자원에 직접적으로 접근할 수가 없다.  
그렇다면, 우리가 위에서 나열한 언어중에서 어떤 언어가 컴퓨터의 자원을 이용할 수 있는가?  
C++. 대표적으로 이 언어가 접근가능하다.

그래서 우리는 이 C++를 사용한다.  
자바스크립트는 C++를 활용해서 컴퓨터의 자원을 사용하는데,  
이 프로그램을 우리는 Node.js라고 부른다.

### Each programming language have different levels of ability to interact with these features diretly

- C++ has many features that let it directly interact with the OS directly
- Javascript does not! so it has to work with C++ to control these computer features. what it this combination known as? ... node.js!!
- js -> node -> computer feature.
