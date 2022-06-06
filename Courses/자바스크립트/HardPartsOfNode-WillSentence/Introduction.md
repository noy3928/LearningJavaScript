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

<br>

# JavaScript, Node & The Computer

## Rewind. we had better understand javascript to understand Node.js then

It's a language that does 3 things (and 1 involves a lot of help from c++).

1. Saves data and functionality
2. Uses that data by running functionality on it
3. Has a ton of built-on labels that trigger Node features that are built-in C++ to use our computer's internal

<br>

우리가 살펴볼 예제 코드

<pre>
<code>
let num = 3;

function multiplyBy2 (inputNumber){
    const result = inputNumber*2;
    return result;
}

const output = multiplyBy2(num);
const newOutput = multiplyBy2(10);
</code>
</pre>

1)global 메모리에 num을 저장
2)global 메모리에 multiplyBy2를 저장.
3)const output를 저장.  
4)그리고 multiplyBy2를 실행해서 execution context가 생성.  
5)이렇게 한 줄씩 실행되는 것은 thread of execution때문에 가능한 것이다.

<br>

# Executing node Code

## So let's see JavaScript other talent - built - in labels that trigger Node features

we can set up, with a JavaScript label, a Node.js feature (and so computer internals) to wait for requests for html/css/js/tweets from our users.

How? the most powerfull built-in-node feature of all : http(and its associated built-in label in JS-also http conveniently)

- http is a format by which you send messages or requests from a web browser.
- js에서 사용하는 특정 코드가 소켓을 열기 위한 작동을 하게 해줄 것이다. 그것은 바로 http이다.

<pre>
<code>
const server = http.createServer();
server.listen(80);
</code>
</pre>

- http.createServer이 코드는 it's a label for a node C++ feature that says we're open channel to the internet.
-
