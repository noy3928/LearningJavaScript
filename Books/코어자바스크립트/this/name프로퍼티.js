/* bind 메서드를 적용해서 새로 만든 함수는 한 가지 독특한 성질이 있습니다. 바로 name 프로퍼티에 동사 bind의 수동태인 bound 라는 접두어가 붙는다는 점입니다. */

var func = function(a,b,c,d){
    console.log(this, a,b,c,d)
}

var bindFunc = func.bind({x:1}, 4, 5);
console.log(func.name); // func 
console.log(bindFunc.name); // bound func

