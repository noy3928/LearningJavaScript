```javascript
const clumsysquare = num => {
  let result = 0
  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= num; j++) {
      result++
    }
  }
  return result
}
```

- Now whenever we call this function with the same input, the program will not have to execute it again.

```javascript
const memoize = func => {
  const results = {}
  return (...args) => {
    const argsKey = JSON.stringify(args)
    if (!results[argsKey]) {
      results[argsKey] = func(...args)
    }
    return results[argsKey]
  }
}

const clumsysquare = memoize(num => {
  let result = 0
  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= num; j++) {
      result++
    }
  }
  return result
})
```
