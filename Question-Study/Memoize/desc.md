# Memoization

- it does this by storing computation results in cache, and retrieving that same information from the cache the next time it's needed instead of computing it again.

- check if each required computation is in the cache before computing it.

- Cache : cache is simply temporary data store
  - that holds data so that future requests for that data can be served faster.

## How does Memoization work?

the concept of memoization in javascript relies on two concepts :
1.closure
2.HOF (high order functions)

<br>

## Example - fibonacci

this is fibonacci code :

```javascript
const fib = n => {
  if (n <= 1) return 1
  return fib(n - 1) + fib(n - 2)
}
```

and see that we're executing fib(0), fib(1), fib(2) and fib(3) multiple times.  
well, that's exactly the kind of problem memoization helps to solve.

- with memoization, there's no need to recalculate the same values once and again - we just store each computation and return the same value when required again.

```javascript
const fib = (n, memo) => {
  memo = memo || {}

  if (memo[n]) return memo[n]
  if (n <= 1) return 1
  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo))
}
```

- if we don't have the value in memo yet, we call fib again, but now passing memo as parameter, so the functions we're calling will share the same memoized values we have in the 'original' function.

<br>

# Lodash\_.memoize() method

- 로다시의 memoize 메서드는 주어진 함수의 결과물을 캐싱하기 위해서 사용된다.

```javascript
const _ = require("lodash")

let sum = _.memoize(function (n) {
  return n < 1 ? n : n + sum(n - 1)
})

console.log(sum(6)) // 21
```

```javascript
const _ = require("lodash")

let object = { ccp: 5, java: 8 }

let values = _.memoize(_.values)

console.log(values(object))
values.cache.set(object, ["html", "css"])
console.log(values(object))
```
