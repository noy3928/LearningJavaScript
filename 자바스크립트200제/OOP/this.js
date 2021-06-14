//---this 이해하기

//this는 함수가 어떻게 호출되는지에 따라 동적으로 결정됩니다. this의 주요 목적은 작성된 코드를 여러 목적으로 재사용하기 위해 존재하는데, 호출되는 방ㅇ식에 따라 동적으로 결정되어 간혹 잘못된 코드를 작성할 수 ㅇㅆ습니다.

//this는 전역에서 사용할 수도 있고 함수 안에서도 사용할 수 있습니다. 하지만 ㅏㅁ수는 객체 안에 메소드로 정의될 수 있고, 생성자 함ㅅ로 사용될 수도 있고 특정 로직을 계산하여 값을 반환하는 목적으로 사용될 수도 있습니다.

//이렇게 함수가 다양하게 사용되다 보니 this도 각 함수별로 다르게 해석됩니다. 물론 화살표 함수에서의 this도 다르게 해석되니다. 그리고 class안에서 사용되는 this는 생성자 함수와 동일합니다.

this.valueA = "a";
console.log(valueA); // a
valueB = "b";
console.log(this.valueB); // b

function checkThis() {
  console.log(this); //window object
}

function checkThis2() {
  "use strict";
  console.log(this); // undefined
}

checkThis();
checkThis2();

//product 함수는 생성자 함수로 작성되었습니다. 하지만 new키워드가 없이 호출되면 이 때 this는 6라인과 동일하게 전역 객체인 window를 가리킵니다. new 키워드와 함께 호출해야지만 this는 프로토타입 객체와 연결된 객체가 반환됩니다.
function Product(name, price) {
  this.name = name;
  this.price = price;
}

const product1 = Product("가방", 2000);
console.log(window.name);
console.log(window.price);

//객체 내에 있는 메서드에서 this를 선언하면 this는 해당 객체를 가리킵니다.
const product2 = {
  name: "가방2",
  price: 3000,
  getVAT() {
    return this.price / 10;
  },
};

const valueOfProduct2 = product2.getVAT();
console.log(valueOfProduct2);

// 메소드 안에서 this를 정의했지만, 메소드를 다른 변수에 저장하고 그 변수를 통해 호출하면 일반적인 함수 호출이 되어 this는 전역 객체를 가리킵니다. 즉, 호출하는 시점에 점(.) 연산자와 함께 객체가 주어져야 메소드 안의 this가 호출의 주체인 객체가 됩니다.
const calVAT = product2.getVAT;
const VAT2 = calVAT();
console.log(VAT2);

//this는 bind메소드를 통해 전달한 인자값으로 변경할 수 있습니다. this외에 call과 apply메소드 또한 this가 가리키는 값을 변경할 수 있습니다.
const newCalVAT = calVAT.bind(product2);
const VAT3 = newCalVAT();
console.log(VAT3);

//메소드 안에서 중첩함수로 함수가 작성됐을 때 내부 함수의 this는 전역 객체를 가리킵니다. 그래서 1초뒤 this.count는 window.count로 해석되어 undefined에 값을 더하려고 해서 NaN이 콘솔에 출력됩니다.
const counter1 = {
  count: 0,
  addAfter1Sec() {
    setTimeout(function () {
      this.count += 1;
      console.log(this.count);
    }, 1000);
  },
};

counter1.addAfter1Sec();

const counter2 = {
  count: 0,
  addAfter1Sec() {
    setTimeout(() => {
      this.count += 1;
      console.log(this.count);
    }, 1000);
  },
};

counter2.addAfter1Sec();
