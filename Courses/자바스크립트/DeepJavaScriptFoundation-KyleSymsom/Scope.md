# Scope

- nested scope
- hoisting
- close
- modules

scope : where to look for things

변수에는 2가지 역할이 있다.

- receiving the assignment of some value
- retrieving a value from the variable.

<br>

카일 심슨은 자바스크립트가 인터프리터가 아니라고 말하고 있다.  
이것이 엄밀하게 말하자면, 컴파일 언어라고 말한다.  
실행하기전에 some processing step이 있다고 한다.

뭘까? 뭐떄문에 자바스크립트를 컴파일언어라고 말하는 것일까? 내가 기존에 들어왔던 것과는 다른 내용인 것 같다.

종종 특정 에러들은 자바스크립트가 실행되기 전에 확인된다.  
10번째 줄에 있는 에러인데, 1-9번째 줄이 실행되지 않았음에도 불구하고,  
자바스크립트는 10번째 줄의 에러를 내뱉는다.

인터프리터와 컴파일러의 중요한 구분점은  
is the code processed before it is executed or not?  
이것이다.

자바스크립트를 실행할 때, sorting marbles는 언제 일어나는 것일까?  
만약에 runtime중에 이것이 실행된다면,  
많은 오류가 예상된다.
sorting marble은 자바스크립트가 실행되기 전에 일어난다.

- we have to think about js as a two-pass system rather than a single-pass.

- JavaScript organizes scopes with functions and blocks

<br>

# Compliation & Scope

<pre>
<code>
var teacher = 'kyle' // Red

function otherClass(){ // Red 
    var teacher = 'suzy'; // Blue
    console.log('welcome');
}

function ask(){ // Red
    var question = 'why?' // Blue
    console.log(question);
}

otherClass();
ask();
</code>
</pre>

<br>
<br>
<br>

## 새롭게 알게 된 단어 및 문장 :

- assert : 주장하다
- gloss over : 얼버무리다.
