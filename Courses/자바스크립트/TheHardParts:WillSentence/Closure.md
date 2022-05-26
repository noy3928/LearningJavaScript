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

<br>
<br>
<br>

## 새롭게 알게된 단어 및 문장 :

- esoteric : 난해한
- Invocation : 기도, 주문, 발동
- remembrance : 추모, 추도, 추억, 기념물
  - memory, recall, look back
- folk : 여러분, 애들아(두 사람 이상의 사람들을 친근하게 부르는 말), 민속의, 전통적인, 민중의, 민간의
- adjecent : 인접한, very near, next to, or touching:
