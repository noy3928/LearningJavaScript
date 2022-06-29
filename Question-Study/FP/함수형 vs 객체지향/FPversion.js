var curry = new Student("haskell", "curry", "111-11-1111", "penn state")

var church = new Student("alonzo", "church", "333-33-3333", "princeton")
church.address = new Address("US")

var kleene = new Student("stephen", "kleene", "444-44-4444", "Princeton")

//객체 지향 프로그램은 Student 메서드로 같은 학교를 다니는 학생을 찾는다.

church.studentsInSameCountryAndSchool([currey, turing, kleene])
//-> [kleene]

/*
반면, 함수형은 문제를 작은 함수들로 잘게 나눈다. 
*/

// 학생의 거주 국가와 학교를 비교하는 selector 함수를 만든다.
let selector = (country, school) => student =>
  student.address.country === country && student.school === school

// 원하는 필터 기준을 selector 함수로 주입하여 배열 원소를 걸러낸다.
let findStudent = (friends, selector) => friends.filter(selector)

findStudent([curry, turing, church, kleene], selector("US", "Princeton"))
// -> [church, kleene]
