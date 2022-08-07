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
