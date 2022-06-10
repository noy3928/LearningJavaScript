# Generators

### Javascript's built in iterators are actually objects with a next method that when called returns the next element from the 'stream' flow - so let's restructure slightly

<pre>
<code>
function createFlow(array){
    let i = 0;
    const inner = {next : 
        function(){
            const el = array[i]
            i++;
            return el
        }
    return inner;
    }
}

const returnNextElement = createFlow([4,5,6])
const el1 = returnNextElement.next()
const el2 = returnNextElement.next()
</code>
</pre>

<br>

### Once we start thinking of our data as flows (where we can pick of an element one-by-one) we can rethink how we produce those flows-javascript now lets us produce the flows using a function.

<pre>
<code>
function *createFlow(){
    yield 4
    yield 5
    yield 6
}

const returnNextElement = createFlow()
const el1 = returnNextElement.next()
const el2 = returnNextElement.next()
</code>
</pre>

returnNextElement.next()을 호출하면 무엇을 반환할까?  
4를 반환하는데 그게 어떻게 이루어지는 것일까?

제네레이터를 함수를 호출하면 객체를 반환한다.  
그 객체에는 next라는 메서드를 가지고 있다.

그리고 그 next메서드를 사용하면 실행 콘텍스트를 생성할 것이다.
그리고 그 안에서 yield 키워드를 사용한다.  
이것은 return을 의미하기도 한다.

### This allows us to dynamically set what data flows to us(when we run returnNextElement's function)

이것을 통해서 우리는 다음번에 올 요소에 대한 제어권을 가질 수 있게 되었다.

<pre>
<code>
function *createFunction(){
    const num = 10;
    const newNum = yield num;
    yield 5 + newNum
    yield 6
}

const returnNextElement = createFlow()
const el1 = returnNextElement.next()
const el2 = returnNextElement.next()
</code>
</pre>

- yield는 곧장 실행 콘텍스트로부터 벗어나게 만든다.그래서 newNum = yield num 에서 오른쪽 부분에서 곧장 밖으로 나가 return한다. 이 때문에 newNum에는 당장에는 값이 할당되지 않는다.
- 그리고 우리는 next(2)이렇게 2의 값을 넣어주었다. 이 2 값을 가지고 실행콘텍스트를 시작한다. 이 값은 아까 yield문에서 끝났던 곧의 value로 들어간다. 이 value는 이제서야 newNum에 담긴다. 그래서 newNum == 7이 된다.
