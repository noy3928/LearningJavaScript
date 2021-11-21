let obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}

Array.prototype.push.call(obj, 'd');
console.log(obj)

let arr = Array.prototype.slice.call(obj);
console.log(arr);

/*
유사 배열 객체의 경우네는 call 또는 apply메서드를 이용해 배열 메서드를 차용할 수 있습니다. 
7번째 줄에서는 배열 메서드인 push를 객체 obj에 적용해 프로퍼티 3에 'd를 추가했습니다. 

9번째 줄에서는 slice 메서드를 적용해 객체를 배열로 전환했습니다. 
slice메서드는 원래 시작 인덱스값과 마지막 인덱스값을 ㅂ다아 시작값부터 마지막 값의 아푸분까지의 배열 욧를 ㅊ출하는 메서드인데,
매개변수를 아무것도 넘기지 않을 겨웅에는 그냥 원본 배열의 얕은 복사본을 반환합니다. 
그런까 call 메서드를 이용해 원본인 유사배열객체의 얕은 복사를 수행한 것인데,
slice 메서드가 배열 메서드이기 때문에 복사본은 배열로 반환하게 된 것이죠. 
*/

function a (){
    var argv = Array.prototype.slice.call(arguments);
    argv.forEach(function (arg) {
        console.log(arg);
    })
}

a(1,2,3);

document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
var nodeList = document.querySelectorAll('div');
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function (node){
    console.log(node)
})