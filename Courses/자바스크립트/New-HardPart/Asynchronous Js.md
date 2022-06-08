# intro

## Asynchronicity is the backbone of modern web development in js.

js is single threaded and has a synchronous execution model(each line is executed in order the code appears.)

so what if we need to wait some time before we can execute certain bits of code?
perhaps we need to wait on fresh data from an API/server request or for a timer to complete and then execute our code.

we have a conundrum - a tension between wanting to delay some code execution but not wanting to block the thread from any further code running while we wait.

- 위의 문단에서 말하고자 하는 것은 자바스크립트에서 비동기 처리가 왜 필요한지에 대한 것이다.
- 자바스크립트에서 수행할 수 없는 기능들을 어디서 수행하는가? brower에서.

우리의 목표 :

- 서버로부터 데이터를 받아오는 긴 시간이 필요한 작업을 할 수 있어야 하고
- 긴 시간이 걸리는 작업이 있어도 js의 실행이 멈춰서는 안되며
- 긴 시간이 걸리는 작업이 끝났을 때, 그것이 완료되었다는 것을 알 수 있어야 한다.

<br>
<br>
<br>

# 새롭게 알게 된 단어 :

- conundrum : 반올림
- untenable : 방어될 수 없는, 옹호될 수 없는
