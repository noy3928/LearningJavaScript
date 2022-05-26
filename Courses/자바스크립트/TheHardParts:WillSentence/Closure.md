# Closure Introduction

만약 클로저를 제대로 이해했다면 당장 직업을 구해도 된다.
이 클로저의 개념은 많은 자바스크립트의 디자인 패턴의 근간이 된다.

<br>

우리는 지난 시간에 함수가 실행되면 실행 콘텍스트가 형성되고,
그 안에서 변수들이 저장되고 값이 할당된다는 것을 배웠다.
그리고 함수가 종료되는 것과 동시에 해당 execution context가 사라지는 것도 배웠다.
때문에 함수 내부에서 생성된 변수는 temporary 하다.

그런데!
**만약 함수 내부에서 생성된 변수가 permernant 한 영역에 닿을 수 있다면?**
그렇게 된다면 우리가 코드를 작성하는 방식이 많이 바뀌게 될 것이다.

## Functions with memories

- when our functions get called, we create a live store of data(local memory, variable environment/state) for that function's execution context.
- when the function finishes executing. its local memory is deleted (exept the return value)
- But what if our functions could hold on on to live data between executions?
- This would let our function definitions have an associated cache/persistent memory
- But it all starts with us returning a function from another function.

<br>

**핵심은 Local에서 사라지던 값이 사라지지 않게 하는 방법이 함수에게 있다는 것이다!**

<br>

# Returning Functions

함수가 다른 함수를 리턴한다는 것은 뭔말인가?  
이것에 대해서 이해해보자.

<pre>
<code>
function createFunction(){
    function multiplyBy2(num){
        return num*2;
    }
    return multiplyBy2;
}

const generatedFunc = createFunction();
const result = generatedFunc(3) // 6
</code>
</pre>

여기서 generatedFunc와 createFuncion의 관계를 설명해주는 문장.  
It was result of createFunction.
generatedFunc is only the result of the one time running of the createFunction.

이제 generatedFunc 를 실행한다면,
i'm running the function that was born as multiplyBy2().

generatedFunc 와 createFuncion은 이제 어떠한 connection도 없다.

자, 이제 이 generatedFunc를 실행하면 또 새로운 execution context가 실행되는 것이다.  
근데 이 generatedFunc의 내용은 createFuncion에 있었는데,  
그러면 자바스크립트는 createFuncion를 살펴볼까?
전혀! 전혀 살펴보지 않는다. 그것은 우리 개발자의 입장에서 이해하기 위해서 살펴볼 뿐이고,  
더 이상 컴퓨터상에서 generatedFunc의 내용이 createFuncion에 저장되어 있지 않으므로, 그것을 실행할 때, 참조하지 않는다.

자, 그러면 이제 생각해볼 것은,  
이런식으로 함수 내부에서 다른 함수를 반환해주는 것은 왜 하는 건가?  
이것에 대한 이해를 가진다면,  
자바스크립트의 여러가지 강력한 기능에 대해서 여러분들은 이해할 수 있게 될 것이다.

<br>

# Nested Function Scope

클로저를 알아보기 이전에 마지막으로 알아볼 내용이다.

<br>
함수가 호출된 부분에서 정의된 함수가,  
해당 블록에서 호출되는 경우.

<pre>
<code>
function outer(){
  let counter = 0;
  function incrementCounter (){
    counter ++;
  }
  incrementCounter();
}

outer();
</code>
</pre>

이 안에서는 변수가 저장되고 있는데,  
outer라는 함수가 호출되고있고,
그 호출되는 함수에서 선언된 변수를  
또 다시 그 안에서 호출된 함수가 사용하고 있다.

이 변수와 함수들의 환경적인 이해관계를 살펴보도록 하자.
이것을 명확하게 이해하게 된다면,  
클로저를 이해하기 위한 근본을 이해했다고 말할 수 있다.

<br>

# Retaining Function Memory

<pre>
<code>
function outer(){
  let counter = 0;
  function incrementCounter(){counter ++;}
  return incrementCounter;
}

const myNewFunction = outer();
myNewFunction();
myNewFunction();
</code>
</pre>

변수는 함수 바깥에 선언되었고, 이 변수를 함수 안쪽에서 참조중이다.  
그런데 정작 함수 바깥으로 내보내진 것은 함수자체이다.  
그러면 이 counter 변수는 어떻게 된 상태일까?

1. 먼저는 myNewFunction이 선언되면서, 그곳에 outer함수가 호출된다. 그리고 호출과 동시에 실행 콘텍스트가 생성되면서, 그 안에서 counter 변수가 선언되고, incrementCounter 함수가 선언되고 반환된다.
2. 자, 그리고 이 실행콘텍스트는 사라진다.
3. 실행콘텍스트가 사라지면서 call stack에 있던, outer 함수도 같이 사라진다.
4. 그리고 전역으로 돌아와서, myNewFunction()함수를 호출한다.
5. call stack에 myNewFunction를 쌓는다.
6. 새로운 실행콘텍스트가 생긴다.
7. counter ++를 실행하려고 한다. 그래서 이 counter 변수가 local memory에 존재하는지 확인하려고 했지만, 그곳에는 counter 변수가 없다. 그러면 어떻게 한담?
8. global memory를 쳐다본다. 그런데, global memory에 counter 변수가 있는가? 명확히 말하지만, 그곳에는 counter 변수가 없다. 재앙이다. 우째된걸까???

<br>

여기서 중요한 부분이 나온다.  
우리가 incrementCounter라는 함수를 리턴할 때, 단순히 counter++만 리턴하지 않았다는 것이다.

outer 실행콘텍스트가 가지고 있던 local memory도 함께, 저장된다.  
어디에 저장된다는 것일까?

It took with it all the surrounding data from where that function was saved, where it was born, where it was stored.

그리고 그 데이터를 가지고, 반환된 함수의 background에 저장된다.  
함수의 backpack에.

<br>

# Function Closure

자 그러면 다시 돌아와서,  
myNewFunction()의 실행콘텍스트로 돌아가보자.  
counter를 ++해야하는데, local memory에는 없다.  
그러면 어디를 쳐다볼까?  
global? 아니. 이 함수의 backpack을 쳐다본다.
그리고 그 backback안에 있는  
counter에 +1을 해준다.

자 그리고 한번 더 myNewFunction를 실행한다.
그리고 그것에 대한 실행 콘텍스트가 생성된다.  
그리고 또 counter를 ++하려고 하지만, local memory에는 없다.  
그래서 backpack을 쳐다본다.  
그리고 그곳에 저장된 counter 에 +1을 해서,  
결국 counter == 2가 된다.

**이 backpack의 기능이 자바스크립트의 most elegant feature이다.**

<br>

### 자, 어떻게 function은 그 주변에 있던 데이터를 함께 함수정의에 포함시킬 수 있었을까?

아마 이런 종류의 함수를 console.log에 찍어보면,  
[[scope]]라는 것이 출력되는 것을 본 적이 있을 것이다.  
it is a hidden property that links to where all this surrounding data is stored. (increamentCounter 함수의 surrounding data)
그래서 이제 이 함수가 반환될 때, 이 [[scope]]도 같이 반환된다.

자, 그래서 우리가 myNewFunction를 실행하려고 했을 때,  
그곳에서 사용되던 변수를 local memory에서 발견할 수 없으면,  
global memory를 확인하기 이전에 [[scope]]가  
intercede한다. "야! global 확인하기전에 나 먼저 확인해봐!"

이 [[scope]]는 local memory처럼 temporary한 저장소가 아니다. permanent한 저장소다.
이 저장소에는 아무나 접근할 수 없다. 오직 해당 function만 접근이 가능한 장소이다.

그러면 이런 [[scope]]의 기능을 가지고 우리는 무엇을 할 수 있을까?  
이것으 Permanent한 속성을 이용해서,
다음번에 호출될 때, 그것을 기억하고 데이터의 조작을 제한할 수 있다.

<br>
<br>
<br>

## 새롭게 알게된 단어 및 문장 :

- esoteric : 난해한
- Invocation : 기도, 주문, 발동
- remembrance : 추모, 추도, 추억, 기념물
  - memory, recall, look back
- folk : 여러분, 애들아(두 사람 이상의 사람들을 친근하게 부르는 말), 민속의, 전통적인, 민중의, 민간의
- adjecent : 인접한, very near, next to, or touching
- look out : 주의하여 보다.
- caveat : (특정 절차를 따르는) 통고
- intercede : 간섭하다, 중재하다, 조정하다.
