# requestAnimationFrame (RAF)

- 브라우저에게 수행하기 원하는 애니메이션을 알린다.
- 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트 하는 함수를 호출한다.
- 리페인트 이전에 실행할 콜백을 인자로 받는다.

- 리페인트 이전에 호출한다는 것은, 리페인트가 실행될 준비가 되면 실행한다는 의미와 같다.
  - calling the animation frame when the system is ready to paint the frame.

이 메서드를 사용하는 목적 :

- 새로운 애니메이션을 업데이트 할 준비가 될 때마다 이 메스드를 호출한다.

이 메서드의 등장 배경 :

과거에는 복잡한 애니메이션을 화면에 보여주고자 할 때 setInterval과 setTimeout등을 이용해서,
간격을 정해놓고 지웠다 보여줬다를 반복해서 애니메이션을 구현했다.  
그러나 이 방법으로는 애니메이션이 부드럽지 않다고 느낄 가능성이 높다.
왜냐하면 이들은 프레임은 전혀 신경쓰지 않기 때문이다.  
그래서 등장한 메서드가 requestAnimationFrame이다.

## 프레임 개념

1프레임 : 이벤트루프가 렌더링 파이프 라인에 진입했을 때부터 다음 파이프 라인 진입까지를 의미한다.

- 초당 60개의 프레임으로 이루어져있다.
- 1초는 1000ms이다.
- 1개의 프레임 = 1000/60 ms = 16ms

[참고자료 : https://tecoble.techcourse.co.kr/post/2021-08-28-event-loop/]
