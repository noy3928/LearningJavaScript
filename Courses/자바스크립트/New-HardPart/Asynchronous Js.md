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

# web browser api

우리가 자바스크립트에서 사용하지만,
자바스크립트의 기능이 아닌 것.
그런것들은 browser가 제공하는 api이다.

그런것들에는 console.log, dom, localstorage 같은 것들이 있다.

<pre>
<code>
function printHello(){
    console.log('Hello')
}

setTimeout(printHello, 1000);

console.log('Me first!')
</code>
</pre>

- setimeout이 실행된다. 여기에 printhello함수가 넘어간다.
  - 이 settimeout은 자바스크립트의 기능이 아니다. js에게는 timer가 없다.
  - 이것은 오직 browser가 하는 일이다.
- 가장 먼저 출력되는 것은 Me First!이다.
- 자바스크립트의 callstack이 비었다. 그러고나서 이제 1001ms가 되면 무슨일이 일어나나? printhello가 실행된다. 다시말하면, printHello가 callstack에 올라간다는 말이다.
- settimeout은 실행콘텍스트를 만들지 않는다.

<br>

<pre>
<code>
function printHello(){
    console.log('Hello')
}

function blockFor1Sec(){

}
setTimeout(printHello,0)
blockFor1Set()
console.log('Me First!')
</code>
</pre>

2ms : blockFor1Sec()이 실행될것이다. call stack에는 blockfor1sec이 올라갈 것이다.
1002ms : Console.log('me first!')가 출력될 것이다.
1003ms : printHello가 콜스택에 올라갈 것이다. 어떻게 이렇게 올라갈 수 있게 되는 것일까?

printHello는 지금 callbackQueue에 들어가있다.
이 콜백큐에 있는 것은 언제 callstack에 올라가는 것이 허용될까?  
callstack이 비어있을 때, 그때 올라갈 수 있다.  
그런 비어있음을 확인하는 것이 이벤트루프이다.

<br>
<br>
<br>

# 새롭게 알게 된 단어 :

- conundrum : 반올림
- untenable : 방어될 수 없는, 옹호될 수 없는
- arbitrary : 임의의, 제멋대로인
- deffered : 연기된
