## 프로미스

```javascript
const codition = true
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공")
  } else {
    reject("실패")
  }
})

promise
  .then(message => {
    console.log(message)
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => {
    console.log("무조건")
  })
```

- new Promise로 생성 가능.
- resolve과 reject를 매개변수로 갖는 콜백함수를 넣는다.
- resolve가 호출되면 then이 실행되고, reject가 호출되면 catch가 실행된다.
- finally 부분은 성공/실패 여부와 상관없이 실행된다.
- resolve와 reject에 넣어준 인수는 각각 then과 catch의 매개변수에서 받을 수 있다.
  - 즉, resolve('성공')이 호출되면 message 가 '성공'이 된다.
- 프로미스를 쉽게 설명하자면, 실행은 바로 하되 결괏값은 나중에 받는 객체이다.
  - 결괏값은 실행이 완료된 후 then이나 catch 메서드를 통해서 받는다.
- then을 연속으로 이어붙일 수 있다.
  - then의 Return 값을 다음 then의 매개변수로 넘긴다.

```javascript
function findAndSaveUser(Users) {
  Users.findOne({}, (err, user) => {
    if (err) {
      return console.error(err)
    }
    user.name = "zero"
    user.save(err => {
      if (err) {
        return console.error(err)
      }
      Users.findOne({ gender: "m" }, (err, user) => {
        //생략
      })
    })
  })
}
```

Promise.all

```javascript
const promise1 = Promise.resolve("성공1")
const promise2 = Promise.resolve("성공2")
Promise.all([promise1, promise2])
  .then(result => {
    console.log(result) // ['성공1', '성공2']
  })
  .catch(err => {})
```

- Promise.resolve는 즉시 Resolve하는 프로미스를 만드는 방법이다.

<br>

## FormData

```javascript
const formData = new FormData()
formData.append("name", "zerocho")
formData.append("item", "orange")
formData.has("item") // true;
formData.get("item") // orange;
formData.getAll("item") // ['orange']
```

## encodeURIComponent, decodeURIComponent

- 서버 종류에 따라 한글 주소를 이해하지 못하는 경우가 있다.
- 이럴 때 window 객체의 메서드인 encodeURIComponent 메서드를 사용한다.
