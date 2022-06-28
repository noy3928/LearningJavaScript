const { cloneByTag } = require("./cloneUtils")

const cloneObjectDeep = target => {
  return cloneByTag(target, cloneObjectDeep)
}

exports.cloneObjectDeep = cloneObjectDeep
