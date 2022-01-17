##### 생성자 함수의 프로퍼티인 prototype 객체 내부에는 constructor라는 프로퍼티가 있습니다. 인스턴스의 __proto__ 객체 내부에도 마찬가지입니다. 이 프로퍼티는 단어 그대로 원래의 생성자 함수(자기 자신)를 참조합니다. 자신을 참조하는 프로퍼티를 굳이 뭐하러 가지고 있을까 싶지만, 이 역시 인스턴스와의 관계에 있어서 필요한 정보입니다. 인스턴스로부터 그 원형이 무엇인지 알 수 있는 수단이기 때문입니다. 

<pre>
<code>
var arr = [1,2];
Array.prototype.constructor === Array // true
arr.__proto__.constructor === Array // true
arr.constructor === Array // true

var arr2 = new arr.constructor(3, 4);
console.log(arr2) // [3,4]
</pre>
</code>

##### 인스턴스의 __proto__가 생성자 함수의 prototype 프로퍼티를 참조하며 __proto__가 생략 가능하기 대문에 인스턴스에서 직접 constructor에 접근할 수 있는 수단이 생긴 것입니다. 그러니까 6번째 줄과 같은 명령도 오류 없이 동작하게 됩니다. 

##### 한편 constructor 는 읽기 전용 속성이 부여된 예외적인 경우를 제외하고는 값을 바꿀 수 있습니다. 

##### 모든 데이터가 d instance NewConstructor 명령에 대해 false를 반환합니다. 이로부터 constructor를 변경하더라도 참조하는 대상이 변경될 뿐 이미 만들어진 인스턴스의 원형이 바귄다거나 데이터 타입이 변하는 것은 아님을 알 수 있습니다. 어떤 인스턴스의 생성자 정보를 알아내기 위해 constructor 프로퍼티에 의존하는 게 항상 안전하지는 않은 것이죠. 

##### 비록 어떤 인스턴스로부터 생성자 정보를 알아내는 유일한 수단인 constructor가 항상 안전하지는 않지만 오히려 그렇기 때문에 클래스 상속을 흉내 내는 등이 가능해진 측면도 있습니다. 이에 대해서는 7장에서 자세히 다루겠습니다. 

<pre>
<code>
var Person = function(name){
    this.name = name;
}

var p1 = new Person('사람1');
var p1Person = Object.getPrototypeOf(p1);
var p2 = new Person.prototype.constructor('사람2');
var p3 = new p1Proto.constructor('사람3');
var p4 = new p1.__proto__.constructo('사람4');
var p5 = new p1.constructor('사람5');

[p1, p2, p3, p4, p5].forEach(function(p){
    console.log(p, p instanceof Person);
})
</pre>
</code>


##### p1부터 p5까지는 모두 Person의 인스턴스입니다. 따라서 다음 두 공식이 성립합니다. 앞서 봤던 그림 6-3을 함께 놓고 보면 더 이해하기가 쉽겠네요. 

* 첫째, 다음 각 줄은 모두 동일한 대상을 가리킵니다. 

<pre>
<code>
[Constructor]
[instance].__proto__.constructor
[instance].constructor
Object.getPrototypeOf([instance]).constructor
[Constructor].prototype.constructor
</pre>
</code>

* 둘째, 다음 각 줄은 모두 동일한 객체(prototype)에 접근할 수 있습니다. 


<pre>
<code>
[Constructor].prototype
[instance].__proto__
[instance]
Object.getPrototypeOf([instance])
</pre>
</code>
