/* 내부 함수에서 메서드의 this를 그대로 바라보게 하기 위한 방법으로 self 등의 변수를 활용한 우회법을 소개했는데, 
call, apply 또는 bind 메서드를 이용하면 더 깔끔하게 처리할 수 있다.*/

var obj = {
    outer:  function(){
        console.log(this);
        var innerFunc = function (){
            console.log(this);
        };
        innerFunc.call(this);
    }
}

var obj1 = {
    outer: function(){
        console.log(this);
        var innerFunc = function(){
            console.log(this);
        }.bind(this);
        innerFunc()
    }
}

var obj2 = {
    logThis: function() {
        console.log(this);
    },
    logThisLater1: function(){
        setTimeout(this.logThis, 500);
    },
    logThisLater2: function(){
        setTimeout(this.logThis.bind(this), 1000);
    }
}

obj2.logThisLater1(); //window{...}
obj2.logThisLater2() // obj2 {logThis: f, ...}