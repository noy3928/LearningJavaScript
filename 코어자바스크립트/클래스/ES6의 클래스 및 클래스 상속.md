앞에서 수 차례 언급했듯이 ES6에서는 본격적으로 클래스 문법이 도입됐습니다. 여기서는 ES5체계에서의 생성자 함수 및 프로토타입과 ES6의 클래스 문법을 비교하면서 소개해 보겠습니다. 다만 ES6의 기능을 자세히 다루는 것은 이 책의 목적에서 다소 벗어나므로 ES5체계에서 추구하던 자바스크립트 클래스(프로토타입)의 방향성을 재확인 하는 목적으로만 간략히 다루겠습니다. 더 자세한 내용은 ES6를 다루는 다른 서적에서 참고하기 바랍니다. 

<pre>
<code>
var ES5 = function(name){
    this.name = name;
};

ES5.staticMethod = function(){
    return this.name + 'staticMethod';
}

ES5.prototype.method = function(){
    return this.name + 'method';
}

var es5Instance = new ES5('es5');
console.log(ES5.staticMethod());
console.log(es5Instance.method());

var ES6 = class {
    constructor (name){
        this.name = name;
    }
    static staticMethod(){
        return this.name + 'staticMethod';
    }
    method(){
        return this.name + 'method';
    }
}

var es6Instance = new ES6('es6');
console.log(ES6.staticMethod());
console.log(es6Instance.method()); //es6 method

</code>
</pre>

<br>
이번에는 클래스 상속을 살펴봅시다. ES5에는 상속 문법 자체가 없으니, 7-3절에서 필자가 구현한 완성본인 예제7-14와 비교해보시기 바랍니다. 

<pre>
<code>
var Rectangle = class {
    constructor (width, height){
        this.width = width;
        this.heigth = height;
    }
    getArea(){
        return this.width * this.height;
    }
};

var Square = class extends Rectangle {
    constructor (width){
        super(width, width);
    }
    getArea(){
        console.log('size is : ', super.getArea());
    }
}
</code>
</pre>

<br>

# 정리
---

자바스크립트는 프로토타입 기반 언어라서 클래스 및 상속 개념은 존재하지 않지만 프로토타입을 기반으로 클래스와 비슷하게 동작하게끔 하는 다양한 기법들이 도입돼 왔습니다. 

<br>
<br>

클래스는 어떤 사물의 공통 속성을 모아 정의한 추상적인 개념이고, 인스턴스는 클래스의 속성을 지니는 구체적인 사례입니다. 상위 클래스 (superClass)의 조건을 충족하면서 더욱 구체적인 조건이 추가된 것을 클래스라고 합니다. 

<br>
<br>

클래스의 prototype 내부에 정의된 메서드를 프로토타입 메서드라고 하며, 이들은 인스턴스가 마치 자신의 것처럼 호출할 수 있습니다. 한편 클래스에 직접 정의한 메서드를 스태틱 메서드라고 하며, 이들은 인스턴스가 직접 호출할 수 없고 클래스에 의해서만 호출할 수 있습니다. 

<br><br>

클래스 상속을 흉내내기 위해 세 가지 방법을 소개했습니다. 바로 SubClass.prototype에 superClass의 인스턴스를 할당한 다음 프로퍼티를 모두 삭제하는 방법, 빈 함수를 활용하는 방법, Object.create를 이용하는 방법입니다. 이 세 방법 모두 constructor 프로퍼티가 원래의 생성자 함수를 바라보도록 조정해야 합니다. 
