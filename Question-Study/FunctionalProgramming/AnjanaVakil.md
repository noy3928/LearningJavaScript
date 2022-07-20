https://observablehq.com/collection/@anjana/functional-javascript-first-steps

# What is Functional programming?

처음 함수형 프로그래밍을 접하면, 꽤 많은 새로운 단어들을 접하게 될 것이다.  
수학적 단어들도 많이 등장한다. 그런데, 지금 이 시간에 다루고자하는 것은 그런 전문 용어들 보다는  
핵심을 관통하는 아이디어에 대해서 이야기해볼 것이다.  
함수형은 하나의 코딩 스타일이라고 생각하면 된다.  
본인이 생각하기에는 함수형을 배움으로써, 자바스크립트에 대해서 더 깊이 이해하게 되었다고 한다.

<br>
이것은 하나의 패더라임이다.  
패러다임은 하나의 세계관으로 생각하면 된다.  
어떻게 바라볼 것인지, 어떻게 행동할 것인지에 대한 것.  
프로그래밍의 세계에는 수없이 많은 패러다임이 있다.

그런데 크게 2가지 패러다임이 있는데,  
명령형과 선언형이다.  
명령형은 하나하니씩 디테일하게 컴퓨터에게 명령하는 것이다.  
이런 명령형 패러다임으로부터 나온 것이 객체지향 프로그래밍이다.  
선언형은 하나하나 명령하기 보다는, 컴퓨터야 내가 원하는건 이거야. 이렇게 말하는 것이다.  
그러면 컴퓨터는 그것이 뭔지 이해하고 행동한다. 대표적인 예로 SQL을 들 수 있다.  
함수형은 하나의 선언형 프로그래밍 스타일이라고 생각하면된다.

## Core principle

함수형은 하나의 core priciple이 있다.  
다른 모든 용어들은 이 핵심원칙으로부터 나온 것이다.  
[이 자료를 읽어볼 것](https://codewords.recurse.com/issues/one/an-introduction-to-functional-programming)
한가지 핵심 원칙은 바로 'PURE FUNCTION'이다.  
only input in  
only output out

함수를 하나의 블랙박스로 생각해보자.  
동그라미를 넣었더니, 세모로 나온다.  
만약 함수가 input된 데이터 이외에 다른 외부세계와 소통하고 있다면, 그것이 바로 side Effect이다.

 <br>

## Compare

not pure :

```javascript
let name = "alonzo"
function greet() {
  console.log(`Hello ${name}!`)
}
greet() //Hello, Alonzo!;
name = "Alan"
greet()
```

pure :

```javascript
function greet(name) {
  return `Hello, ${name}!`
}
greet("Alonzo")
greet("Alan")
```

만약 외부에서 참조하고 있던 변수의 이름을 변경하게 된다면, 그것이 문제가 될 수도 있다.  
하지만 함수의 인자에 의존하게 된다면 항상 같은 인자에 같은 결과값을 기대할 수 있다. 그런 사실이 보장되는 것이다.  
이 함수의 결과물이 외부의 어떤 세계에도 의존하지 않게 된다.  
함수형에서의 함수는 무조건 같은 인자에 대해서 같은 결과값을 반환해야 한다.  
인자가 같은데 결과가 다르다? 전혀 순수하지 않은 함수라고 할 수 있다. 정절을 지키는 함수가 되도록!

단순히 반환값을 결과라고 생각해서는 안된다. 위의 예시의 경우에는 console.log를 찍고 있는데,  
외부 세계에 영향을 미치는 무언가를 결과라고 이해하면 될 것 같다.  
그런 결과가 항상 같아야 한다.

### 함수 안에서 또 다른 함수를 호출한다면 그것은 순수함수라고 할 수 있는가?

함수 안에서 이용하고자 하는 자원이 있다면, 가능하면 인자에 넘겨서 사용할 수 있도록 해야한다.  
그것이 함수형의 원칙이다.  
하지만 이렇게 할 경우 함수가 굉장히 방대해질 수도 있고 복잡해지기도 해서, 전역에 선언된 함수를 곧장 사용하는 것이 좋아보일 수도 있다.

조금 더 명확하게 이야기해보자면, 함수 안에서 다른 함수를 호출하는 것이 순수성을 해치냐는 질문에  
내부에서 호출하는 함수의 순수성에 달려있다고 말할 수 있다.  
그래서 만약에 내부에서 사용하는 함수가 순수하다고 확실할 수 있다면 우리는 그것을 감싸고 있는 함수의 순수성을 해치지 않았다고 말할 수 있다.

### 함수형의 의도

함수형 프로그래밍을 하고자 하는 의도는 가장한한 비지니스 로직을 프로그램 내부에 가지고 있음으로써,  
모든 것을 예측 가능하게 만들고, 사이드 이펙트를 최소화하는 것이다.  
이런 것을 통해서 생산성을 높이는 것이 함수형의 가장 큰 의의라고 할 수 있을 것 같다.

<br>

## Why Functional Promgramming?

함수가 결정적인 성향을 가지고 있다면, 우리는 예측 가능성이 높아진다.  
더 이상 외부 자원을 참조하고 있지 않으므로, 외부에서 변수를 바꿨던지 뭔 수정을 가하든지 신경 안쓴다.  
오로지 내부 로직만 신경 쓸 뿐이다.  
이렇게 하면 훨씬 더 디버깅이 쉬워지고, 테스트도 쉬워진다.

함수형에서의 테스트는 올바른 인자를 넣어주는 것만 하면 된다.

## Why Function Javascript?

- 자바스크립트에서의 객체지향은 어렵기 때문에??ㅋㅋㅋ 그런데 자바스크립트에서 함수형을 사용하기 시작하면 모든 것이 굉장히 쉬워진다.
- 커뮤니티가 형성되어 있기 때문에. 함수형 자바스크립트에 대한 커뮤니티가 굉장히 잘 형성되어있다.

## Side Effect

함수형으로 프로그래밍을 하면 해야하는 생각.  
"내 프로그램은 무엇을 받고, 무엇을 반환하지??"

```javascript
//Imperative
let name = "Alonzo"
let greeting = "Hi"

console.log(`${greeting}, ${name}!`)
greeting = "Howdy"
console.log(`${greeting}, ${name}!`)

//declaretive
function greet(greeting, name) {
  return `${greeting}, ${name}`
}
greet("Hi", "Alonzo")
greet("Hi", "Howdy")
```

프로그램 자체를 함수를 생각할 것.  
무엇을 받고, 무엇을 반환할지.

```javascript
let thesis = { name: "Church's", date: 1936 }
function renameThesis(newName) {
  thesis.name = newName
  console.log("Renamed!")
}
renameThesis("Church-Turing") // Renamed!
thesis //{ name: "Church's", date: 1936 }
```

- 인자가 아닌, 외부자원을 활용한 것.

아래는 함수형으로 변환한 버전 :

```javascript
const thesis = { name: "Church's", data: 1936 }
function renameThesis(oldThesis, newName) {
  return {
    name: newName,
    data: oldThesis.date,
  }
}

const thesis2 = renameThesis(thesis, "Church-Turing")
thesis
thesis2
```

이것은 새로운 객체를 반환한다.
그리고 외부 자원을 인자로 받아온다.

<br>

## Recursion

똑같은 코드를 반복적으로 수행하고자 할 때

함수형을 작성하고자 한다면,
iteration 대신에 recursion을 작성하도록 하자.

```javascript
function sum(numbers) {
  let total = 0
  for (i = 0; i < numbers.length; i++) {
    total += numbers[i]
  }
  return total
}

sum([0, 1, 2, 3, 4])
```

이 코드를 더 functional 하게 바꾼다면 아래와 같이 될 수 있다.

```javascript
function sum(numbers) {
  if (numbers.length === 1) {
    return numbers[0]
  } else {
    return numbers[0] + sum(numbers.slice(1))
  }
}
sum([0, 1, 2, 3, 4])
```
