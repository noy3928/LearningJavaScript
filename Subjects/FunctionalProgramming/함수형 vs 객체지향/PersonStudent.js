class Person {
  constructor(firstname, lastname, ssn) {
    this._firstname = firstname
    this._lastname = lastname
    this._ssn = ssn
    this._addresses = null
    this._birthday = null
  }

  get ssn() {
    return this._ssn
  }
  get firstname() {
    return this._firstname
  }
  get lastname() {
    return this._lastname
  }
  get address() {
    return this._address
  }
  get birthday() {
    return this._birthday
  }
  set birthYear(year) {
    this._birthYear = year
  }
  set address(addr) {
    this._address = addr
  }
  toString() {
    return `Person(${this._firstname}, ${this._lastname})`
  }
  peopleInSameCountry(friends) {
    let result = []
    for (let idx in friends) {
      var friends = friends[idx]
      if (this.address.country === friends.address.country) {
        result.push(friend)
      }
    }
    return result
  }
}

class Student extends Person {
  constructor(firstname, lastname, ssn, school) {
    super(firstname, lastname, ssn)
    this._school = school
  }

  get school() {
    return this._school
  }

  studentsInSameCountryAndSchool(friends) {
    //super로 부모 클래스에 접근하여 데이터를 받아온다.  부모 객체와 단단히 결합된 코드가 된다.
    let closeFriends = super.peopleInSameCountry(friends)
    let result = []
    for (let idx in closeFriends) {
      let friend = closeFriends[idx]
      if (friend.school === this.school) {
        result.push(friend)
      }
    }
    return result
  }
}
