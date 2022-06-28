## Learn About Functional Programming

Functional programming is about:

- Isolated functions - there is no dependence on the state of the program, which includes global variables that are subject to change(독립성)
- Pure functions - the same input always gives the same output(순수성)
- Functions with limited side effects - any changes, or mutations, to the state of the program outside the function are carefully controlled(불변성)

```javascript
// Function that returns a string representing a cup of green tea
const prepareTea = () => "greenTea"

/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
const getTea = numOfCups => {
  const teaCups = []

  for (let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea()
    teaCups.push(teaCup)
  }
  return teaCups
}

// Only change code below this line
const tea4TeamFCC = getTea(40)
// Only change code above this line
```

<br>

## Understand Functional Programming Terminology

*Terminology : 전문용어, 기술용어
*mood swings : 변심

상황을 가정해보자. 아까 greenTea를 원했던 FCC팀원들이 이제는  
blackTea와 greenTea 둘 다를 원한다.

이런 정보와 함께 getTea 함수를 다시 들여다보자.  
getTea함수를 수정할텐데, 그 파라미터로 준비해야하는 Tea를 받을 수 있도록 하는 함수를 받도록 수정해줄 것이다.  
이렇게 함으로써 getTea를 훨씬 더 유연하게 만들어줄 것이고, 고객의 요구에 쉽게 반응할 수 있게 될 것이다.  
<br>

하지만, 그 전에 FP의 전문 용어를 살펴보자.
**콜백** 은 자신의 제어권을 다른 함수에게 넘겨주는 함수이다.
또한 변수에 할당되거나, 다른 함수로 전달되거나, 다른 함수에서 반환될 수 있는 함수들을 **first class function** 이라고 한다.  
그리고 함수를 인수로 사용하거나 함수를 반환 값으로 반환하는 함수를 **고차 함수** 라고 한다. **High Order Function**  
함수가 다른 함수로 전달되거나 반환되는 경우, 전달되거나 반환된 함수는 **람다** 라고 할 수 있다. **Lambda**

```javascript
// Function that returns a string representing a cup of green tea
const prepareGreenTea = () => "greenTea"

// Function that returns a string representing a cup of black tea
const prepareBlackTea = () => "blackTea"

/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
const getTea = (prepareTea, numOfCups) => {
  const teaCups = []

  for (let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea()
    teaCups.push(teaCup)
  }
  return teaCups
}

// Only change code below this line
const tea4GreenTeamFCC = getTea(prepareGreenTea, 27)
const tea4BlackTeamFCC = getTea(prepareBlackTea, 13)
// Only change code above this line

console.log(tea4GreenTeamFCC, tea4BlackTeamFCC)
```
