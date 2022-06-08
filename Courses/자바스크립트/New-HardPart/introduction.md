# introduction

자바스크립트가 실행되기 위해서 꼭 필요한 2가지
1.Thread of execution : 한줄 한줄의 실행, 위에서부터 아래로.
2.execution context

<pre>
<code>
const num = 3;
function multiplyBy2(inputNumber){
    const result = inputNumber*2;
    return result;
}

const output = multiplyBy2(4)
</code> 
</pre>

When you execute a function you create execution context comprising :

1. The thread of execution (we go through the code in the function line by line)
2. A local memory(Variable environment) where anything defined in the function is stored.

- 더 이상 참조가 없는 변수들은 가비지컬렉터의 수집대상이 된다.
-

<br>
<br>
<br>

# 새롭게 알게 된 단어 :

- agnostic : 불가지론자
- refine : 정제하다, 개선하다
- Trivial : 사소한, 하찮은
- we spin up two things : 우리는 두 가지를 회전시킨다 -> 두가지를 동작시킨다는 말인 것 같다.
