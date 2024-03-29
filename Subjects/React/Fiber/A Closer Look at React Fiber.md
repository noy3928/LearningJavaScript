# A Closer Look at React Fiber

Fiber는 리액트 팀이 리액트의 핵심 알고리즘을 리팩토링한 것이다. 그리고 리액트팀이 이것을 수행하는데 2년이나 걸렸다.  
이 것은 react v16에서 소개되었는데, 이것의 디자인 철학은 충분히 공부할 만하다.

## Why Fiber

브라우저에서, 페이지는 프레임마다 만들어진다.  
그리고 프레임 렌더링 속도는 각각 기기의 새로고침 속도와 일치한다.  
일반적으로, 화면 새로고침 rate는 1초에 60번이다.  
그리고 프레임이 1초에 60번 이상이 넘어갈 경우에 화면이 부드럽게 렌더링된다.
그렇지 않으면, 페이지는 멈출 것이다.  
다음의 그림이 하나의 프레임에서 어떤 일이 일어나는지를 보여주고 있다.

![complete frame](./img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-08-02%20%EC%98%A4%ED%9B%84%204.16.27.png)

1. 첫번째로, 가능하면 빠른 유저 피드백을 주기 위해서 input event가 진행된다.
2. 두번째로, 예약된 시간에 도달했는지 확인하기 위해서 타이머를 확인한다. 그러고 나서 시간이 맞나면 대응하는 콜백 함수를 실행해준다.
3. 세번째로, Begin Frame을 확인한다.(이것은 각각의 프레임의 이벤트이다.) window.resize, scroll, media query change 등등도 같이 확인한다.
4. 네번째로, rAF를 실행한다. painting이 시작되기 전에 callback 이 실행된다.
5. 다섯번째로, 레이아웃 작업을 수행한다. 여기서 layout을 계산하고, 업데이트한다. 다시 말해서 어떻게 element가 화면에서 styled되고 보여질지를 결정한다.
6. 여섯번째로, paint 작업을 수행한다. 각각 노드의 size와 위치값은 주어졌으니, 각 요소의 내용들이 브라우저에 의해 화면에 채워지는 단계다.
7. 일곱번째로, 브라우저 idle 상태에 들어간다.

https://www.alibabacloud.com/blog/a-closer-look-at-react-fiber_598138
