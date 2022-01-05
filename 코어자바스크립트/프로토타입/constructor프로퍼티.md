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



