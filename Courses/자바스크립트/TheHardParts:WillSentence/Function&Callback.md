# Generalized Functions

함수는 왜 필요한가?
함수는 DRY 원칙을 지킬 수 있게 해준다.
여러가지로 반복되어 사용되던 것들을 추상화해줄 수 있다.

또한 이 함수를 통해서, 넣어줄 데이터를 미리 결정해주지 않아도 된다.
이런 역할을 하는 것이 parameter이다.

parameter의 더 깊은 의미를 알아보자.  
Parameter : means we don't need to decide what data to run our functionality on until we run the function

    - Then provide an actual value('arguement') when we run the function.

이 파라미터의 의미로부터 Higher Order Function의 원칙도 찾아낼 수 있다.

    - We may not want to decide exactly what some of our functionality is until we run our function.

함수가 호출되기 전까지, 함수의 기능을 결정하지 않는다는 것. 그것이 higher order function이다.

# Higher Order Functions

<pre>
<code>
function copyArrayAndMainipulate(array, instructions){
    const output = [];
    for(let i = 0; i < array.length; i ++){
        output.push(instructions(array[i]))
    }
}

function multiplayBy2(input){ return input * 2; }
const result = copyArrayAndMainipulate([1,2,3], multiplayBy2)

</code>
</pre>

[executionContextOfHighOrderFunction](./Img/IMG_1165.jpg)

<br>

# How was this possible?

Functions in javascript = first class objects

They can co-exist with and can be treated like any other javascript object.

1. Assigned to variables and properties of other objects.
2. Passed as arguements into functions.
3. Returned as values from functions.

# Callbacks and Higher Order Functions simplify our code and keep it DRY

**Declarative readable code** : Map, filter, reduce - the most readable way to write code to work with data.

**Codesmith & pro interview prep** : One of the most popular topics to test in interview both for Codesmith and mid/senior level job interviews

**Asynchronous JavaScript** : Callbacks are a core aspect of async JavaScript, and are under-the-hood of promises, async/await.

- Intricacy : 복잡한 사항
- radiant : 빛나는
