# Intro

### Classes, Prototypes - Object Oriented JavaScript

- An enormously popular paradigm for structuring our complex code
- Prototype chain - the feature behind - the - scenes that enables emulation of OOP but is a compelling tool in itself
- Understanding the different between **proto** and prototype
- The new and class keywords as tools to automate our object & method creation.

### OOP를 통해서 우리가 이루고자 하는 것

- 1. Easy to reason about
- 2. Easy to add features to (new functionality)
- 3. Nevertheless efficient and performant

<br>

# Object Dot Notation

### So if i'm storing each user in my app with their respective data(let's simplify)

- user1 :
  - name : tim
  - score : 3
- user2 :
  - name : stephanie
  - score : 5

And the functionality i need to have for each user(again simplifying!)

- increment functionality

How could i store my data and functionality together in one place?

먼저, 떠오르는 가장 간단한 방법은 object이다.

<pre>
<code>
const user1 = {
    name:'Will',
    score : 3,
    increment : function(){user1.score++;}
}

user1.increment();
</code>
</pre>

자, 그러면 이 상황에서 새로운 property를 추가하고 싶다면 어떻게 해야할까?  
.을 사용하면 된다.

<pre>
<code>
const user2 = {};

user2.name = 'Tim';
user2.score = 6;
user2.increment = function (){
    user2.score++;
}
</code>
</pre>

<br>

# Factory Functions

그러면 혹시 또 다른 방법은 없을까? 저렇게 .을 이용해서 만드는 방법 말고??  
빈 객체를 만들어주는 built-in 함수에는 뭐가있을까?  
object.create라는 함수가 있다.

<pre>
<code>
const user3 = Object.create(null);

user3.name = 'Eva';
user3.score = 9;
user3.increment = function(){
    user3.score++;
}
</code>
</pre>

이런식으로 작성함으로써 어느정도 OOP의 목적을 달성했다.  
그런데 코드가 너무 repetitive하다. 우리는 DRY 원칙을 꺠뜨려버렸다.
어떻게 해야할까?

<pre>
<code>
function userCreator(name, score){
    const newUser = {};
    newUser.name = name;
    newUser.score = score;
    newUser.increment = function (){
        newUser.score++;
    }
    return newUser;
}

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment;
</code>
</pre>

- 생성된 객체의 키값을 변수가 아니다. 객체의 속성이다. This is not a variable, right? This is not a label, this is not an identifier. This is a property on the object, new user.

- function factory를 통해서 생성된 객체마다 새로운 closure가 생성된다.

- 이 코드의 문제점은 무엇인가? 우리가 이런 방식을 사용하지 않는 이유는?
  - increment함수가 반복되고 있다. 1만번 이 userCreator가 생성된다면, 1만번 incremnet함수가 생성되는 것이다. 매우 불필요한 반복이 된다.

그러면 이 문제를 어떻게 해결할까?  
increment를 매번 새롭게 생성할 것이 아니라,  
외부에 생성되어있는 increment함수를 객체 내부에서 참조할 수 있도록 만들어주면 된다.

<br>

# Prototype Chain

### solution : using the prototype chain

store the increment function in just one object and have the interpreter, if it doesn't find the function on user1,  
look up to that object to check if it's there.

Link user1 and functionStore so the interpreter, on not finding .increment, makes sure to check up in functionStore  
where it would find it.

Make the link with Object.create() technique.

<pre>
<code>
function userCreator(name, score){
    const newUser = Object.create(userFunctionStore);
    newUser.name = name;
    newUSer.score = score;
    return newUser;
}

const userFunctionStore = {
    increment : function(){this.score++;},
    login : function(){console.log("Logged in")}
}

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();
</code>
</pre>

<br>

# Prototype Chain Example : Prototypal Link

궁긍한 것은 newUser 안에서 Object.create할때 넣었던 함수는 어떻게 연결되는 것일까?  
그 내부에서는 무슨 일이 일어나서, 그렇게 link가 되는 것일까?

그곳에는 hidden property가 있다.  
**proto**라는 property이다.  
이 property는 useFunctionStore를 가리키고 있다.  
**proto** : userFunctionStore()

이것을 Prototype과 헷갈리지는 말자. 서로 다른 것이다.  
어쩃든 그래서, user.increment()를 호출할 때, userFunctionStore를 참조할 수 있게 된다.

이제 이렇게 함으로써 메모리의 낭비가 없어진다.  
똑같은 함수를 매번 반복해서 생성함으로써 생겼던 낭비 문제가 없어졌다.  
그리고 이제 함수를 호출했을 때, 그 안에서 함수의 내용물을 찾을 수 없으면,
**proto**의 내용물을 확인해서 그곳에 있는 찾아본다. 그래서 있으면 그것을 사용한다.  
that is its prototype was one of feature is a feature like its lexical scope property.

<br>

# Prototype Chain Example : Implicit Parameter

- Object.create의 인자로 들어오는 것들은 항상 **proto**로 가게 된다.

- 우리가 user1.increment를 호출할 때, execution context가 실행되면서 local memory에 무엇이 저장될까? implicit parameter가 생성된다. 그리고 이것이 바로 this이다 .
  - 이 this에는 무엇이 저장될까? user1이 저장된다.
  - .왼편에 있는 것이 this에 저장된다.
  - this.score++ 는 user1.score++가 된다.

<br>

# hasOwnProperty Method

hasOwnProperty라는 Method는 도대체 어디서 온걸까??
Big Old Headline Object가 있다.  
object.prototype이라는 object이다.
모든 자바스크립트의 object는 **proto**라는 Property를 가지고 있는데,
이것은 object.prototype에 Link되어있다.  
그리고 Object.prototype이 HasOwnProperty라는 method를 가지고 있는 것이다.

user1을 찾았더니, global메모리에 있다.
거기에 접근한다. hasOwnProperty를 찾는다.
global memory에 없다. 절망하나? 아니다.  
userFunctionStore에 접근한다. 여기서 HasOwnProperty를 찾는다.
여기있나? 없다. 절망하나? 아니다.
object.prototype에 접근한다. hasOwnProperty가 있나?  
있다. 그래서 이것을 사용할 수 있게 된다.

그러면 object.prototype의 **proto**는 어디에 연결되어있을까??
기존적으로 Null의 값이 저장되어있다.

<br>

# this Keyword

<pre>
<code>
function userCreator(name, score){
    const newUser = Object.create(userFunctionStore);
    newUser.name = name;
    newUSer.score = score;
    return newUser;
}

const userFunctionStore = {
    increment : function(){
        function add1(){
            this.score++;
        }
        add1();
    },
}

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();
</code>
</pre>

- 메서드를 호출해서 생성되는 실행콘텍스트에서는 this가 Local memory에 저장되고, .왼쪽편에 있는 변수의 값이 저장된다.

- 해당 변수 안에 있는 function add1안에 있는 this는 어디를 가리킬까?
  - global memory를 쳐다본다. 그런데 거기에는 Score가 없기 때문에 Undefined가 나온다.

## Arrow function Style

when we use arrow function style, it's this assingment is automatically lexically scoped.
that's to say, when we save the function, when we execute it, what this is set to is determined by
where the function was saved.
so if it was saved where this is user1, when we end up running it,
this inside will be this value from where the function was saved, which is user1.

예시 코드를 보자.

<pre>
<code>
function userCreator(name, score){
    const newUser = Object.create(userFunctionStore);
    newUser.name = name;
    newUSer.score = score;
    return newUser;
}

const userFunctionStore = {
    increment : function(){
        const add1  = () = > {
            this.score++;
        }
        add1();
    },
}

const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.increment();
</code>
</pre>

user1은 global에 저장되어있고,
increment는 user1에 없으니 **proto**를 통해서,
userFunctionStore를 확인하고,
그곳이 있으니 그것을 사용한다.
그래서 그 메소드가 실행되면서, execution context가 실행되고,
그곳의 Local memory에는 가장 먼저 Implicit parameter인 this가 저장된다.
그리고 this의 값으로는 User1이 저장된다.
그리고 add1이라는 변수에 arrow function style로 함수가 저장된다.
우리는 즉시 add1를 실행한다.

add1의 execution context가 실행되고,
local memory에 값들을 저장할 것이다.
(만약 호출한 함수에 .이 있다면 그 왼쪽편에 있는 변수를 this에 할당하지만, 그렇지 않은 방식으로 호출한 함수는 global을 가리키게 된다.)
그렇지만 지금 우리는 arrow function을 선언한 상황이다.
this에는 뭐가 저장되어 있을까?  
user1이 저장될 것이다.

arrow function이 저장된 곳의 Lexical environment가 this에 저장된다.
결론적으로 이제 this.score++는 user1.score++ 가 될 것이다.

<br>
<br>
<br>

## 새롭게 알게된 단어 및 문장 :

- emulation : 1.경젱, 겨룸, 대항 2.에물레이션(다른 컴퓨터의 기계어 명령대로 실행할 수 있는 기능)
- compelling : 강렬한, 주목하지 않을 수 없는, 설득력있는, 강력한
- untenable : 방어될 수 없는, 옹호될 수 없는
- redundant : 불필요한, 쓸모없는
- intimate : 친밀한
