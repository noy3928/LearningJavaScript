const { initClone } = require("./cloneUtils")

function getTag(value) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]"
  }
  return toString.call(value)
}

const copyObjectDeep = target => {
  const tag = getTag(target)
  return initClone(tag, target, copyObjectDeep)
}

exports.copyObjectDeep = copyObjectDeep
