// Function.prototype.bind(thisArg[,arg1[,arg2[, ...]]])

/* bind 메서드는 call과 비슷하지만 즉시 호출하지는 않고 넘겨받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 하는 메서드입니다.  
함수에 this를 미리 적용하는 것과 부분 적용 함수를 구현하는 두 가지 목적을 모두 지닙니다. */

var func = function(a,b,c,d){
    console.log(this, a,b,c,d);
}

func(1,2,3,4) // window{...} 1 2 3 4

var bindFunc1 = func.bind({x:1});
bindFunc1(5,6,7,8) // {x:1} 5 6 7 8 

var bindFunc2 = func.bind({x:1}, 4, 5);
bindFunc2(6,7) // {x:1} 4 5 6 7 
bindFunc2(8,9) // {x:1} 4 5 8 9

