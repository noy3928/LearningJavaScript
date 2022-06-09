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

# Return Next Element with a Function

자, 우리는 왜 이런 내용을 살펴봤을까.  
지금 우리가 방금 살펴본 내용은 함수 안에서 또 다른 함수를 내보내주는 구조이다.
이것을 가능하게 하는 함수는 정말 많은 것들을 해낼 수 있다  
또한 이런 함수의 특성은 이터레이터에도 지대한 영향을 미친다.

functions that when we call them give us our next element from our flow of data.

<br>

### we want to create a function that holds both our array, the position we are currently at in our stream of elements and has the ability to return the next element.

<pre>
<code>
function createFunction(array){
    let i = 0;
    function inner(){
        const element = array[i];
        i++;
        return element
    }
    return inner
}

const returnNextElement = createFunction([4,5,6])
const element1 = returnNextElement()
const element2 = returnNextElement()
</code>
</pre>

이전에 실행했던 내용을 기억하고 있는 그런 함수는 없을까?  
위의 코드를 살펴보자.

생략하고, element1부터 살펴보자.
returnNextElement을 호출해서, 새로운 콘텍스트가 생겼다.
그리고 그 안에서 element라는 변수를 선언하고, array[i]를 넣으려고 한다.
그런데, array[i]은 어디서 난건가????  
우리는 맨처음에 어디를 보는가?
가장 가까이에 있는 local memory를 살펴본다. 봤더니 없었다.
그래서 그 다음으로 보는 것은 어디인가?  
global을 내다봐야한다.
그런데, global에도 없다. 그러면 error내보내야한다. 맞는가???? 아니다.

위에서 우리가 inner 함수를 선언하고 내보낼 때,
우리는 이 함수가 선언할 당시의 lexical environment도 같이 가져온다.  
그래서 사실 아까 array[i]라는 데이터를 확인하려했을 때,
global을 내다볼 것이 아니라, inner함수의 backpack을 확인해야했던 것이다.  
그래서 맨처음에는 4를 return 한다.

그리고 그 다음번 returnNextElement을 호출하면,
이제 inner의 backpack에서 가지고 있는 i의 값은 1이다.  
아까 우리가 저장했던 값이 persist되고 있기 때문이다.

<br>

# Iterator Function

## The bond

- When the function inner is defined, it gets a bond to the surrounding local memory in which it has been defined.
- when we return out inner, that surrounding live data is returned out too - attached on the 'back' of the function definition itself(which we now give a new global label returnNextElement)
- when we call returnNextElement and don't find array or i in the immediate execution context, we look into the function definition's backpack' of persistent live data
- The 'backpack'is officially known as the C.O.V.E or 'closure'

## So iterators turn our data into 'streams' of actual values we can access one after another.

Now we have functions that holds our underlying array, the position we're curretly at in the array, and return out the next item in the 'stream' of elements from our array when run.

This lets us have for loops that show us the element itself in the body on each loop and more deeply allows us to rethink arrays as flows of elements themselves which we can interact with by calling a function that switches that flow on to give us our next element.

We have truly 'decoupled' the process of accessing each element from what we want to do to each element

<br>
<br>
<br>

# 새롭게 알게 된 단어 :

- imperative : not to be avoided or evaded, 반드시 해야하는, 긴요한
- problematic : 문제가있는,posing a problem , not definite or settled
- the most seasoned engineer : 가장 노련한 기술자
- interlude : 사이
