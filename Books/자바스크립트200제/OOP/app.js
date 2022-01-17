//원형 객체 (prototype)
//모든 객체는 다른 객체의 원형(prototype)이 될 수 있습니다. 특징을 묘사하는 원형객체를 만들고, 이 원형 객체에 기반하는 여러 객체들을 만들면 모두 같은 특징을 가질 수 있습니다.

const studentProto = {
  gainExp: function () {
    this.exp++;
  },
};

const harin = {
  name: "하린",
  age: 10,
  exp: 0,
  __proto__: studentProto,
};

const bbo = {
  name: "뽀",
  age: 20,
  exp: 10,
  __proto__: studentProto,
};

bbo.gainExp();
harin.gainExp();
harin.gainExp();

//현재 이곳에서는 studentProto가 다른 객체의 원형이 되고 있다.
//두 객체 모두 경험치를 얻는 행위를 하는 것이 가능하다. 왜냐하면 모두 같은 원형 객체에 연결되어 있기 때문이다.

//----생성자 함수 이해하기
function Teacher(name, age, subject) {
  this.name = name;
  this.age = age;
  this.subject = subject;
  this.teach = function (student) {
    console.log(student + "에게" + this.subject + "를 가르칩니다.");
  };
}

const jay = new Teacher("jay", 30, "JavaScript");
console.log(jay);
jay.teach("bbo");

console.log(jay.constructor);
//모든 객체는 constructor속성을 가집니다. 이 속성은 객체를 만든 생성자 함수를 가리킵니다. 그렇기 때문에 jay객체의 constructor속성은 teacher생성자 함수를 가리키고 콘솔에 해당 내용이 출력됩니다.
console.log(jay instanceof Teacher);
//객체에 타입이 적용되면 해당 객체는 그 타입의 인스턴스라고 부릅니다. 앞의 예제에서는 두 객체 모두가 학생타입의 인스턴스라고 할 수 있습니다. 생성자 함수는 새로운 타입을 정의하는데 사용됩니다. 그래서 new키워드로 만들어진 객체는 해당 타입의 인스턴스가 됩니다.

const jay2 = Teacher("jay", 30, "JavaScript");
console.log(jay2);
console.log(age); //30
//new키워드를 빼고 생성자 함수를 호출했기 때문에, this는 전역 객체를 가리키게 된다. 전역 객체에 name과 age그리고 subject속성으로 전달받은 매개변수가 할당됩니다. 그래서 전역변수의 age를 참조해 콘솔에 30이 출력됩니다. 그리고 새로운 객체가 반환되지 않아 jay2는 undefined가 출력됩니다.

//--------프로토타입 기반 상속 이해하기
function Storage() {
  this.dataStore = {};
}

//스토리지 생성자 함수의 프로토타입 객체에 put메소드를 추가합니다. put메소드는 주어진 키에 해당하는 값을 dataStore속성에 할당합니다.
Storage.prototype.put = function (key, data) {
  this.dataStore[key] = data;
};

//인스턴스를 생성하면 해당 생성자 함수의 프로토타입을 상속합니다.
const productStorage = new Storage();
productStorage.put("id001", { name: "키보드", price: 2000 });
console.log(productStorage.getData("id001"));

//리무버블스토리지 함수를  정의합니다. 이때 storage함수를 호출하면서 this를 전달하는데 이렇게 되면 storage생성자 함수가 호출되면서 removableStorage생성자 함수의 this에 storage생성자 함수에서 정의한 대로 dataStore가 속성으로 추가됩니다.
function RemovableStorage() {
  Storage.call(this);
}

//Object.create메서드는 주어진 인자를 proto에 연결한 새로운 객체를 반환합니다. 이 메서드를 이용하면 간단히 상속관계를 형성할 수 있습니다. 이에 자연스럽게 스토리지가 가지고 있는 프로토타입이 리무버블스토리지의 프로토타입에 할당됩니다.
RemovableStorage.prototype = Object.create(Storage.prototype);
RemovableStorage.prototype.removeAll = function () {
  this.dataStore = {};
};

//RemovableStorage함수에 의해서 만들어지는 인스턴스들은 내부에 없는 메소드를 RemovableStorage함수의 프로토 타입에서 찾고, 없으면 storage 생성자 함수의 프로토타입에서 찾게됩니다. 나아가 object.prototype에서까지 찾게 됩니다. 이렇게 프로토타입객체가 서로 연결되어있다하여 이를 프로토타입 체인이라고도 합니다. 다음은 각 생성자 함수의 프로토타입이 연결된 형태를 보여줍니다.

const productStorage2 = new RemovableStorage();
productStorage2.put("id001", { name: "키보드", price: 2000 });
productStorage2.removeAll();
const item2 = productStorage2.getData("id001");
console.log(item2);
