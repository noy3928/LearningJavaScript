# Primitive Types

> In JavaScript, everything is an object

이런 문장을 본 적이 있을 것이다. 그치만 이 문장은 틀렸다.  
하지만 false는 object가 아니기 때문이다.
이 문장이 탄생한 이유는 자바스크립트 value들의 대부분이  
객체처럼 동작하기 때문이지 그것이 곧 객체임을 뜻하는 것은 아니다.

> ECMAScript Language Types
>
> > An ECMAScript language type corresponds to values that art directly manipulated by an ECMAScript programmer using the ECMAScript language. The ECMAScript language types ard Undefined, Null, Boolean, String, Symbol, Number, and Object. An ECMAScript language value is a value that is characterized by an ECMAScript language type.

primitive type의 목록

- undefined
- null
- boolean
- string
- number
- symbol
- object

<br>
 
 # typeof Operator

- undefined : initialized되었지만, 아직 값은 가지지 않고 있는 상태.
  - 명확한 의미는 dose not currently have a value.
  - 굳이 이렇게 말한 이유는 값을 가졌다가도 다시 undefined 상태로 돌아갈 수 있기 때문이다.

<br>

# Kinds of Emptiness

undefined는 선언되었지만 비어있는 것이고,
undeclared는 아예 선언조차 되지 않는 것이다. 그래서 어떤 scope에도 존재하지 않는 것이다.

<br>

# NaN & isNaN

<pre>
<code>
var myAge = Number('0o46') // 38
var myNextAge = Number('39') //39
var myCatsAge = Number('n/a') //NaN
myAge - "my son's age"; //NaN

myCatsAge === myCatsAge; // false

isNaN(myAge) // false
isNaN(myCatsAge) // true
isNaN("my son's age") // true

Number.isNaN(myCatsAge); //true
Number.isNaN("my son's age"); //false
</code>
</pre>

- NaN doesn't mean not a number essentially it means this special  
  what we call sentinel value that indicates an invalid number.

- NaN with any other mathematical operation is always NaN, cuz it's invalid.

- NaNs are not equal to each other.

  - NaN is the only value in existence. it's the only value that does not have what we call the identity property, meaning it is not equal to itself.
  - undefined is equal to itself.

- 10번쨰 줄 : 왜 true로 나오는가..?!

  - the isNaN utility coerces values to numbers before it checks for them to be NaN.
  - so, it's gonna coerce the string my son's age to a number, and guess what number it's gonna coerce it to? NaN value.

- 그렇지만 Number.isNaN 메서드는 다르다.

  - 이것은 따로 coerce를 진행하지 않기 때문에 순수하게 판단한다.

- NaN is number. it's just an invalid number.

<br>

# Negative Zero

- Q : 근데 나는 이 부분 강의를 들으면서 도대체 -0은 언제 쓰이는 것일지가 궁금했다. 내가 이것을 쓸 일이 있을까?

- Object.is라는 메서드를 사용하기

<br>

# Fundamental Object

만약 아래와 같은 목록의 fundamental Object를 이용하고 싶다면,

- Object
- Array
- Function
- Data
- RegExp
- Error

new 키워드를 사용하자.

아래의 목록에서는 New 키워드를 사용하지 말 것.

- String
- Number
- Boolean

<pre>
<code>
var yesterday = new Data("March 6, 2019");
yesterday.toUTCString();

var myGPA = String(transcript.gpa)
</code>
</pre>

<br>
<br>
<br>

## 새롭게 알게 된 단어 및 문장 :

- caveat : 통고
- plausible : 그럴듯한, 수긍할 수 있는
- ergonomically : 인체공학적으로
- sentinel : 감시병
- perplexingly : 복잡성의
- retrospect : 회상, 회고, 추억, 회구
