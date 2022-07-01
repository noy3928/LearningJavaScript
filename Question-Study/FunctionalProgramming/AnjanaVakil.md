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
