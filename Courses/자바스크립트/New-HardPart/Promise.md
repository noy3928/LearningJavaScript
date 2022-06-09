# intro

## Introducing the readablity enhancer - Promises

- special objects built into Javascript that get returned immediately when we make a call to web browser API/feature that's set up to return promises.
- Promises act as a placeholder for the data we hope to get back from the web browser feature's background work.
- we also attach the functionality we want to defer running until that background work is done(using the built in .then method)
- promise objects will automatically trigger that functionality to run

<br>

# Promises

<pre>
<code>
function display(data){
    console.log(Data)
}

const futureData = fetch('https://twitter.com/will/')
futureData.then(display);
console.log('Me first!');
</code>
</pre>

fetch는 Object를 반환할 것이다.  
그 객체에는 value라는 Property가 있다.
그리고 onfulfillment라는 hidden property가 있다.
그리고 이 onfulfillment에 저장된 함수는  
value가 업데이트 될 때, auto-trigger 될 것이다.

then에 넣은 함수는 onfulfillment의 배열에 담길 것이다.
이게 트위터 서버에서 value가 도착하면,
프로미스 객체의 value property에 담기게 될 것이다.

<br>

# Promises & Microtask Queue

- 미뤄진 기능 중 어떤것이 먼저 실행될 것인가?
- 마이크로태스트 큐는 그 안에 값이 들어오고, 콜스택이 비어있다면 즉시 실행되는가?

  - 마이크로테스크 큐는 콜백 큐보다 높은 우선순위를 가지는가? 그렇다. 이벤트 루프는 콜스택이 비어있으면 마이크로테스크큐를 먼저 확인한다.

- then에 들어간 함수는 어디 큐로 가게 될것인가? 마이크로태스큐 큐로 이동한다.
- 마이크로태스크 큐는 자바스크립트가 가진 큐다.

  - [참고 : https://262.ecma-international.org/7.0/#sec-jobs-and-job-queues]

- The Micro task is designed that when the event loop is grabbing things from it, as long as there's something in there, it ain't leaving even if you're adding more as you go.

- 나의 질문 : 만약 마이크로태스크 큐에 계속해서 데이터가 들어와서 수행해야하는 일이 있다면, 절대 콜백큐로는 돌아가지 않는 것일까?
