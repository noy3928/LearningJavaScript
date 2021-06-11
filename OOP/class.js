//클래스 안쪽을 관례상 몸통이라고 부른다.클래스 안에는 생성자 함수를 작성할 수 있다. construct를 통한 하나의 생성자 함수만 만들 수 있다. 생성자는 new키워드를 통해 생성될 때, 호출된다. 요약하면 생성자 함수에서는 매개변수에서 전달받은 값을 속성으로 추가하거나, 속성의 초기값을 대입하는 초기화 과정을 주로합니다.
class Cart {
  constructor() {
    this.store = {};
  }

  //19라인에서 cart1인스턴스를 통해 addProduct를 호출하는 것을 볼 수 있다. 여기서 전달받은 product객체의 id를 store객체의 키로 하여 객체 자체를 값으로 저장하고 있다. getProduct메소드를 통해 전달받은 id인자에 해당하는 product를 반환합니다.

  addProduct(product) {
    this.store[product.id] = product;
  }

  getProduct(id) {
    return this.store[id];
  }
}

const cart1 = new Cart();

cart1.addProduct({ id1: 1, name: "노트북" });
console.log(cart1.store); //{'1': {id:1, name: '노트북'}}

const p = cart1.getProduct(1);
console.log(p); //{id:1,name: '노트북'}

//---클래스 상속 이해하기

//차트 클래스를 정의합니다. drawLine매서드는 통해 라인을 그립니다.
class Chart {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  drawLine() {
    console.log("draw line");
  }
}

// 차트 클래스를 상속하는 바차트 클래스를 정의합니다. 클래스 상속은 extends 키워드를 사용합니다. 상속을 하게 되면 생성자 함수에서 상속한 부모 클래스의 생성자를 호출해야하는데 이때 super 키워드를 사용합니다. 즉, super가 부모 생성자 함수를 가리킵니다.
class BarChart extends Chart {
  constructor(width, height) {
    super(width, height);
  }

  //상속했기 때문에 부모 클래스에서 정의된 메서드를 사용할 수 있습니다.
  draw() {
    this.drawLine();
    console.log(`draw ${this.width} X ${this.height} barChart`);
  }
}

//바차트 클래스의 인스턴스를 만들고 draw메서드를 호출합니다. 부모 클래스인 차트 클래스의 생성자 함수가 호출되어 width와 height 속성에 주어진 값이 할당되고, 부모 클래스에 정의된 drawLine메소드도 잘 호출되는 것을 확인할 수 있습니다.
const barChart1 = new BarChart(100, 100);
barChart1.draw(); //draw Line, draw 100x100 barChart
