# Return Function inside a function

### Iterators

we regularly have lists or collections or data where we want to go through each item and do something to each element.

we're going to discover theres a new beautiful way of thinking about using each element one-by-one.

<pre>
<code>
const numbers = [4,5,6]

for(let i = 0; i < numbers.length;i++ ){
    console.log(numbers[i])
}
</code>
</pre>

### programs store data and apply functionality to it. But there are two parts to applying functions to collections of data.

1.the process of accessing each element
2.what we want to do to each element

iterators automate the accessing of each element - so we can focus to do to each element - and make it available to us in a smooth way

imagine if we could create a function that stored numbers and each time we ran the function it would return out an element (the next one) from numbers. NOTE: it'd have to remember which element was next up somehow.

<pre>
<code>
function createNewFunction(){
    function add2(num){
        return num+2;
    }
    return add2;
}

const newFunction = createNewFunction()
const result = newFunction(3)
</code>
</pre>

가장 먼저 createNewFunction을 선언하고, 거기에 함수를 저장한다.
다음으로 newFunction을 선언하고, 거기에 createNewFunction의 호출결과를 저장한다. 그 결과는 add2라는 함수이다.

createNewFunction을 호출했으니, 실행콘텍스트가 생성된다.  
그 로컬 메모리에 add2라는 함수를 선언한다. 그리고 그 함수가 return되고 있다.

마지막으로 result를 선언하고, 거기에 newFunction을 호출한 결과를 담는다.
이제 우리는 createNewFunction에 대해서는 신경쓰지 않는다.

<br>
<br>
<br>

# 새롭게 알게 된 단어 :

- imperative : not to be avoided or evaded, 반드시 해야하는, 긴요한
- problematic : 문제가있는,posing a problem , not definite or settled
- the most seasoned engineer : 가장 노련한 기술자
- interlude : 사이
