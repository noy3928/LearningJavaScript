# Single Threaded Execution Review

자바스크립트가 synchronous language라는 말은 한번에 한줄씩 실행하고, 그 한줄을 끝마치고나면 다음 줄을 실행한다는 의미다.
한 줄을 끝내기 전에는 다음 줄로 넘어가지 않는 것이 자바스크립트라는 사실을 기억하자.

<br>

# Asynchronicity in JavaScript

### Asynchronicity is the backbone of modern web development in Javascript yet..

JavaScript is :

- Single threaded (one command runs at a time)
- Synchronously executed (each line is run in order the code appears)

So what if we have a task :

- Accessing Twitter's server to get new tweets that takes a long time.
- Code we want to run using those tweets

Challenge : We want to wait for the tweets to be stored in tweets so that they're there to run displayTweets on - but no code can run in the meantime.

문제가 되는 것은 트위터의 정보를 불러오는데까지 많은 시간이 걸린다는 것이다.  
그리고 싱글 스레드인 경우 해당 코드가 완료되기 전까지 다음 코드로 넘어갈 수 없으니,
그것이 문제가 되는 상황인 것이다.  
자바스크립트에서는 다음 코드로 넘어갈 수가 없다. 그게 문제다!!
<br>

### Slow function blocks further code running

<pre>
<code>
const tweets = getTweets('http://twitter.com/wiil/1')

// 350ms wait while a request us sent to Twitter HQ 

displayTweets(tweets)

// more code to run
console.log('I Want to runnnn!')
</code>
</pre>

### what if we try to delay a function directly using setTimeout?

<pre>
<code>
function printHello(){
    console.log('Hello');
}

setTimeout(printHello, 1000);
console.log('Me first!')
</code>
</pre>

이 코드를 우리가 지금까지 이해해온 자바스크립트의 상황에서 보자면,  
me first는 hello가 출력된 다음에 그러니까 1초뒤에 출력될 것이다.  
아니 그러면 아래의 코드는???

<pre>
<code>
function printHello(){
    console.log('Hello');
}

setTimeout(printHello, 0);
console.log('Me first!')
</code>
</pre>

이번에는 실제 상황에서 한번 설명해보자.
지금까지 배웠던 자바스크립트의 가정을 벗어나서.  
실제로 이 코드에서 일어나는 일은  
0초 뒤에 실행되는 것임에도 불구하고,  
me first가 먼저 출력되고, hello가 다음에 출력될 것이다.  
이게 무슨일일까?

이런 현상을 이해하기 위해서 조금 더 알아야 할 지식이 있다.
계속해서 설명해보자.

### JavaScript is not enough - We need new pieces (some of which aren't JavaScript at all)

Our core JavaScript engine has 3 main parts:

- Thread of execution
- Memory/variable environment
- Call stack

We need to add some new components :

- Web Browser API/Node background APIs
- Promises
- Event Loop, Callback/Task queue and micro task queue.

자바스크립트만으로는 충분하지 않으니, 조금더 추가되어야 할 스펙이 있다.  
그리고 그 스펙들에 대해서 지금부터 상세하게 알아가보자.

<br>

# Asynchronous Browser Features

우리의 코드는 어디에서 실행되는가?
우리의 코드는 자바스크립트에서 실행되는 것이 아니라,
브라우저 상에서 코드가 실행된다.  
자, 그리고 브라우저는 그저 자바스크립트만 존재할 때보다 더 많은 것을 제공해준다.

<br>
<br>
<br>

# 새롭게 알게된 단어 및 문장 :

- saddle : 안장
