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

<br>
<br>
<br>

## 새롭게 알게된 단어 및 문장 :

- esoteric : 난해한
- Invocation : 기도, 주문, 발동
- remembrance : 추모, 추도, 추억, 기념물
  - memory, recall, look back
- folk : 여러분, 애들아(두 사람 이상의 사람들을 친근하게 부르는 말), 민속의, 전통적인, 민중의, 민간의
