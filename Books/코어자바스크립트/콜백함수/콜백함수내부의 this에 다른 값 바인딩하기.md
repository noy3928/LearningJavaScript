#### 객체의 메서드를 콜백 함수로 전달하면 해당 객체를 this로 바라볼 수 없게 된다. 왜냐하면 콜백함수로 전달했을 때는 그냥 그냥 함수 자체를 넘기는 것이기 때문에, 그냥 함수 자체로 인식하게 되고, 때문에 this는 전역객체를 바라보게 되기 때문이다. 

#### 자, 위와 같은 사실에도 불구하고 콜백함수 내부에서 this가 객체를 바라보게 만들고 싶다면 어떻게 해야할까?(그러니까, 메서드를 콜백함수로 넘겼을 떄!)

#### 전통적으로 사용되는 방식을 먼저 소개보자면, 변수에 this를 담는 방식이다! 변수에 this를 담아서 콜백함수에서는 this 대신 그 변수를 사용하게 만들고, 이를 클로저로 만드는 방식이 많이 사용되었다. 

##### 아래의 코드는 그 전통적인 방식을 소개하고 있다 : 
<pre>
<code>
var obj1 = {
    name: 'obj1',
    func: function(){
        var self = this;
        return function(){
            console.log(self.name);
        }
    }
}
var callback = obj1.func();
setTimeout(callback, 1000)
</code>
</pre>

#### 위의 코드와 같은 방식으로 실행하면, obj1을 출력하게 될 것이다. 

#### 사실 이 방식으론 this를 사용하지도 않을 뿐더러 번거롭기 그지 없다. 차라리 this를 안쓰는 편이 나을 정도다. 이 코드를 아래와 같이 바꿔보겠다. 

<pre>
<code>
var obj2 = {
    name: 'obj2'
    func: obj1.func
};
var callback2 = obj2.func();
setTimeout(callback2, 1500);

var obj3 = {name: 'obj3'}
var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 2000);
</code>
</pre>

#### 다음 코드는 callback2 에서 obj2 의 func를 실행한 결과를 담아 이를 콜백으로 사용했다. callback3의 경우 obj1의 func를 실행하면서 this를 obj3가 되도록 지정해 이를 콜백으로 사용했습니다. 예제를 실행해보면 실행 시점으로부터 1.5초 후에는 'obj2'가, 실행 시점으로부터 2초 후에는 'obj3'이 출력됩니다.


#### 아래에서 보여주는 코드는 전통적인 방식을 보완하는 방법이다. es5 이후에 나온 bind 메서드를 활용하는 방법이다. 

<pre>
<code>
var obj1 = {
    name : 'obj1',
    func: function(){
        console.log(this.name)
    }
};
setTimeout(obj1.func.bind(obj1),1000);

var obj2 = {name: 'obj2};
setTimeout(obj1.func.bind(obj2), 1500);
</code>
</pre>


