//일반적인 메서드는 인스턴스를 통해서 호출합니다. 그러나 정적 메서드는 클래스를 통해 직접 호출하는 메서드를 말합니다. 클래스에서 정적 메소드는 static키워드를 사용하여 정의합니다.

class Product {
  //난수를 id로 하는 새로운 상품 인스턴스를 반환한다.
  static build(name, price) {
    const id = Math.floor(Math.random() * 1000);
    return new Product(id, name, price);
  }

  //세금을 계산하는 정적 메서드
  static getTaxPrice(product) {
    return product.price * 0.1 + product.price;
  }

  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// DeposableProduct클래스는 상품 클래스를 상속합니다. 클래스로 상속을 하게 되면 정적 메소드 또한 상속하게 됩니다.
class DeposableProduct extends Product {
  depose() {
    this.depose = true;
  }
}

const gum = Product.build("껌", 1000);
console.log(gum);

const clothes = new DeposableProduct(1, "옷", 2000);
//DeposableProduct클래스에서 따로 getTaxPrice함수를 정의해주지 않았지만, Product클래스를 상속했기 때문에 호출ㅇ 가능합니다.
const taxPrice = DeposableProduct.getTaxPrice(clothes);
console.log(taxPrice);

//------------

//클래스를 정의할 때 정적 속성 또한 static 키워드와 get 키워드를 통해 정의할 수 있습니다.
class ProductWithCode {
  static get CODE_PREFIX() {
    return "PRODUCT-";
  }

  constructor(id) {
    this.id;
    this.code = ProductWithCode.CODE_PREFIX + id;
  }
}

const product1 = new ProductWithCode("001");
console.log(ProductWithCode.CODE_PREFIX);
console.log(product1.code);
