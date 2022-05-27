# Promise Introduction

web browser에서 제공하는 기능들이 있었다.
그런데 이 기능들이 동작하는 것들을 우리가 추적할 수 있을까?  
그렇게 할 수 없는 것들이 있었는데,  
fetch의 경우에는 다르다.

이 fetch는 network request 작업을 브라우저 엔진에서 진행한 다음,
자바스크립트의 메모리 상에 특별한 object를 부여한다.
그 object는 바로 Promise이다.  
그리고 웹브라우저에서는 이 Promise 내부의 상태를 지속적으로 업데이트 해준다.  
이 웹브라우저 내부에서 일어나는 작업과 Promise는 아주 긴밀하게 연결되어있어서,
그것의 상태가 지속적으로 업데이트 되는 것이 가능해진다.

### Solution (Promise)

Using two-pronged 'fecade' functions that both:

- initiate background web browser work and
- Return a placeholder object(promise) immediately in Javascript

<pre>
<code>
function display(data){
    console.log(data)
}

const futureData = fetch('http://twitter.com/will/tweets/1')
futureData.then(display);

console.log('Me First!')
</code>
</pre>

여기 이 fetch라는 기능이 internet에게 말한다. 데이터를 가져오라고. web browser 상에서 일어나는 일이다.  
맹세컨데, 이것은 자바스크립트의 기능이 아니다.  
그런데 그 즉시 이 fetch는 Promise라는 object를 반환하는데,  
그 Promise에 즉각적으로 web browser상에서 일어나는 일들의 상태를 받아볼 수 있게된다.  
이것은 자바스크립트 내부에 반영되는 일이다.

<br>

# Promises Example : fetch

위 코드의 예시로 하나씩 살펴보자.

1. display를 저장하고, futureData도 저장한다.
2. fetch가 실행되면서 이 fetch는 특별한 object 인 Promise를 반환한다.
3. 그래서 이 Promise에 각종 browser내부에서 진행되는 networt 정보들이 업데이트된다.
4. 그리고 이 fetch는 또 다른 한 갈래의 길을 web browser에 내놓는다. 그 web browser 안에서 network request가 진행된다.
5.

다시 말하지만, web browser 내부에서는 각종 일들이 일어날 것이다.  
트위터의 서버에 http request를 보내고 응답을 받아올 것이다.  
그렇게 받아온 응답은 어디에 저장되는가?  
promise 객체의 value 파트에 저장될 것이다.  
그 저장되는 것이 무엇인가? The response data.  
이것이 언제 응답이 오던지 간에, 오늘 오던지, 내일 오던지 간에,  
응답이 오는 그때에 web browser 상에 있던 response data가  
javascript promise object 내부에 저장된다.  
아주 신기한 일이다.

<br>
<br>
<br>

# 새롭게 알게된 단어 및 문장 :

- is desire to say : 하고 싶은 말이다.
- two pronged : 두 갈래의
- myriad : 무수히 많음, 무수한
- we want to put on for a while : 우리는 잠시 동안 입어보고 싶다.
