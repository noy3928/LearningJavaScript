// var numbers = [10,20,3,16,45];
// var max = min = numbers[0];
// numbers.forEach(function(number){
//     if(number>max){
//         max = number
//     }
//     if(number<min){
//         min = number
//     }
// });

// console.log(max, min) //45 3 

/*위의 코드를 apply를 활용해 간단하게 구현할 수 있다 */

var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);
console.log(max, min); // 45 3 


/* 펼치기 연산자를 활용하면 더 간단하게 작성할 수 있다. */

var number = [10, 20, 3, 16, 45];
const max = Math.max(...number);
const min = Math.min(...number);
console.log(max,min)

