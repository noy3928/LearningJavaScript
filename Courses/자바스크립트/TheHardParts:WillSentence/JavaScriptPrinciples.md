# Thread Of Execution

자바스크립트는 한 줄에 하나씩 실행한다.
이것을 우리는 Thread of Execution이라고 부른다.

<br>

자바스크립트는 한 줄씩 내려가면서,
메모리 공간에 변수와 함수를 저장한다.

<br>

# Functions

The thread of execution : the ability to go through the code line-by-line and do it.
The memory : to store anything that shows up while we're inside that function.

이런 코드의 실행와 메모리에 변수,함수 등이 저장되는 것을 일컫는 단어가 있다.  
그것은 바로 execution context이다. (실행 콘텍스트)

<pre>
<code>
const num = 3;

function multiplyBy2(inputNumber){
    const result = inputNumber*2;
    return result;
}

const output = multiplyBy2(num)

</code>
</pre>

위의 함수가 호출되면 가장 먼저일어나는 일은 무엇일까?  
먼저는 local memory에 이 함수에서 실행될 내용들이 저장된다.

1. 첫번째로 저장되는 것은 파라미터에 있는 값이다.  
   inputNumber : 3 가 저장될 것이다.
   이곳에서의 변수를 우리는 파라미터라고 부르고,
   저장되는 값을 인자라고 부른다. arguement.

2. 그 다음으로는 result가 저장된다. 그 변수에 6이라는 값이 저장된다.

3. 마지막 줄이 하는 말 : it's saying that locate the block of memory that is bound to the label resolve and ship it out of

<br>

> 메모리에 저장되어 있는 것을 우리는 value라고 부른다.

<details>
<summary>실행콘텍스트란?</summary>
<div markdown="1">
2가지 작용을 일컫는 말이다. 
1) 변수,함수를 메모리상에 할당하는 일 
2) 한줄 한줄의 코드가 실행되는 일

이것을 정리된 한 문장으로 말하자면,
실행컨텍스트는 실행 가능한 코드가 실행되기 위해 필요한 환경이라고 할 수 있다. (모던 자바스크립트)

</div>
</details>

<br>

# Call Stack

자바스크립트의 엔진 중 하나.
여기에는 실행 중인 함수들이 쌓인다.
그리고 그것을 통해서 자바스크립트는 실행 중인 함수들을 추적할 수 있다.  
여기 있는 함수들은 그 내부의 return문에 의해서 사라지게 된다.

만약 call stack에 아무 함수도 없다면, global() 함수가 실행중이다.
