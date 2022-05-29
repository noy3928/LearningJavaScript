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

생성된 객체의 키값을 변수가 아니다. 객체의 속성이다. This is not a variable, right? This is not a label, this is not an identifier. This is a property on the object, new user.

<br>
<br>
<br>

## 새롭게 알게된 단어 및 문장 :

- emulation : 1.경젱, 겨룸, 대항 2.에물레이션(다른 컴퓨터의 기계어 명령대로 실행할 수 있는 기능)
- compelling : 강렬한, 주목하지 않을 수 없는, 설득력있는, 강력한
- untenable : 방어될 수 없는, 옹호될 수 없는
- redundant : 불필요한, 쓸모없는
