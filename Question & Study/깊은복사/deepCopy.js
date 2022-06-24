const { initClone } = require("./cloneUtils")

const copyObjectDeep = target => {
  return initClone(target, copyObjectDeep)
}

exports.copyObjectDeep = copyObjectDeep
