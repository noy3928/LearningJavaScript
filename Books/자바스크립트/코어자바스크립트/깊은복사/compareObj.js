function compareObject(target1, target2, checkEquality) {
  if (typeof target1 === "object" && typeof target2 === "object") {
    checkEquality(target1, target2)
    for (const prop in target1) {
      compareObject(target1[prop], target2[prop])
    }
  } else {
    return
  }
}

exports.compareObject = compareObject
