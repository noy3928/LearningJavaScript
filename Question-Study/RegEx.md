## 정규표현식이란

- 패턴 매칭 기능을 제공한다.

```javascript
const tel = "010-1234-567팔"
const regExp = /^\d{3}-\d{4}-\d{4}$/
regExp.test(tel) // false
```

## 생성

```javascript
const target = "Is this all there is?"
const regExp = /is/i
regExp.text(target) // true
```

```javascript
const target = "Is this all there is?"
const regExp = new RegExp(/is/i)
regExp.test(target)
```

생성자 함수를 사용하면 변수를 사용해 동적으로 객체 생성이 가능.

```javascript
const count = (str, char) => (str.match(new RegExp(char, "gi")) ?? []).length
count("Is this all there is?", "is") // 3
count("Is this all there is?", "xx") // 0
```

## 정규식 메서드

### exec

exec메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다.
이 메서드는 첫 번째 매칭 결과만 반환한다.

```javascript
const target = "Is this all there is?"
const regExp = /is/

regExp.exec(target) // ["is", index:5 ....]
```

### test

매칭 결과를 불리언 값으로 반환

```javascript
const target = "Is this all there is?"
const regExp = /is/

regExp.exec(target) // true
```

### match

매칭 결과를 반환. exec과 다르게 g플래그를 사용하면 모든 매칭 결과를 반환

```javascript
const target = "Is this all there is?"
const regExp = /is/
target.match(regExp)
```

## 플래그

중요한 3가지 플래그

- i(ignore case) : 대소문자를 구별하지 않고 패턴을 검색
- g(Global) : 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색
- m(Multi line) : 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.

## 패턴

정규 표현식 : 일정한 규칙을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어(formal language)

- 정규 표현식은 패턴과 플래그로 구성된다.
  - 패턴 : 문자열의 일정한 규칙을 표현하기 위해 사용
  - 플래그 : 검색 방식을 설정하기 위해 사용

### 임의의 문자열 검색

.은 임의의 문자 한 개를 의미한다.  
문자의 내용은 무엇이든 상관없다.  
다음 예제의 경우 .을 3개 연속하여 패턴을 생성했으므로  
문자의 내용과 상관없이 3자리 문자열과 매치한다.

```javascript
const target = "Is this all there is?"
const regExp = /.../g
target.match(regExp) // ['Is ', 'thi', 's a', 'll ', 'the', 're ', 'is?']
```

### 반복 검색

{m,n}은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.  
콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의해야 한다.

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /A{1,2}/g
target.match(regExp)
```

{n}은 앞선 패턴이 n번 반복되는 문자열을 의미한다.

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /A{2}/g
target.match(regExp) // ['AA', 'AA']
```

{n,}은 n번 이상.

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /A{2,}/g
target.match(regExp)
```

+는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미한다.  
즉, +는 {1,}과 같다.

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /A+/g
target.match(regExp)
```

?는 앞선 패턴이 최대 한 번 이상 반복되는 문자열을 의미한다.

```javascript
const target = "color colour"
const regExp = /colou?r/g
target.match(regExp) //['color', 'colour']
```

### OR 검색

|는 Or의 의미를 갖는다.

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /A|B/g

target.match(regExp) ///['A', 'A', 'A', 'B', 'B', 'B', 'A', 'B', 'A', 'A', 'A']
```

분해되지 않은 단어 레벨로 검색하려면 +를 함께 사용하기

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /A+|B+/g

target.match(regExp) //['A', 'AA', 'B', 'BB', 'A', 'B', 'AAA']
```

위 예제는 패턴을 Or로 한 번 이상 반복하는 것인데, 이를 간단히 표현하면 다음과 같다.  
[]내의 문자는 or로 동작한다. 그 뒤에 +를 사용하면 앞선 패턴을 한 번 이상 반복한다.

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /[AB]+/g
target.match(regExp)
```

범위를 지정하려면 [] 내에 -를 사용한다.

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /[A-Z]+/g
target.match(regExp)
```

대소문자를 구별하지 않고 알파벳을 검색하는 방법

```javascript
const target = "A AA B BB Aa Bb AAA"
const regExp = /[A-Z]+/gi
target.match(regExp)
```
