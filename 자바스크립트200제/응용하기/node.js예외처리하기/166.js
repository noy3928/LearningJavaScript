/*노드에서 에러를 처리하는 방법에는 두 가지가 있습니다.
1) 비동기 모듈 혹은 함수의 callback에서 첫 번째 매개변수로 에러 정보를 반환합니다. 
이에따라 비동기 모듈 또는 함수를 호출할 때에는 먼저 첫 번째 매개변수인 에러 정보를 우선적으로 확인해야합니다. 
에러 정보가 빈 값인 것을 확인한 이후 다음 작업을 수행하는 것을 권장합니다. 

2)두번째 방법은 try-catch,throw입니다. 이는 자바스크립트 예외 처리와 동일하게 처리합니다. 다만 주의해야 할 점은
첫번째 방법에서 활용한 비동기 패턴에 try-catch,throw를 적용하는 것은 잘못된 방법입니다. 
무조건 비동기 함수의 에러처리는 callback함수를 활용해야합니다. (왜..? 왜 비동기에서는 callback을 사용해야 한다는 것일까?)
반대로, callback 함수로 처리하지 않는 그 외 패턴에 대해서는 try-catch,throw를 적용하여 에러를 처리합니다. 
*/


"use strict";


//비동기 함수에서 callback으로 사용할 함수 cbFunc를 정의합니다. 첫 번째 매개변수에는 err변수를, 두번째 매개변수에는 결과값 result 변수를 정의합니다. 
const cbFunc = (err, result) => {
    //만일 err에 값이 있으면서, 동시에 err가 Error 객체인지 확인합니다. 이 경우 Error 객체의 message 속성을 콘솔 에러로 출력하고, return 반환을 통해 바로 함수를 종료합니다. 
    if(err && err instanceof Error) return console.error(err.message);
    //만일 err에 값이 있으면서, Error객체가 아닌 경우, 5라인 조건식 내부 구문이 실행됩니다.이떄에도 콘솔 에러로 err변수를 출력하여 바로 함수를 종료합니다.
    if(err) return console.error(err);
    //err값을 모두 확인해도 값이 없으면 7라인이 실행됩니다. 이때에는 확인된 에러가 없기 때문에 처리 결과가 정상임을 의미합니다. 변수 result값을 콘솔 출력합니다.
    console.log('에러를 반환하지 않습니다', result);
}

//비동기 함수를 직접 선언합니다. 첫 번째 매개변수에는 불리언 자료형이 고려된 isTrue변수를, 그리고 두 번째 매개변수에는 callback 변수를 정의합니다. 
const asyncFunction = (isTrue, callback) => {
    //자바스크립트 Error 객체처럼 사용할 수 있는 node.js core api error 모듈이 있습니다. new Error를 통해 객체를 생성하여 변수 err에 대입합니다. 여기서 Error 객체 생성 시 대입된 'this is error'문자열은 error객체의 message속성으로 값이 할당됩니다.
    const err = new Error('This is error!!');
    //첫 번째 매개변수로 대입된 값에 따라 callback으로 반환되는 값이 달라집니다. isTrue가 true이면 첫 번째 callback인자에 null을 넣고, 추가로 전달할 값은 두 번째 인자에 넣습니다. 
    if(isTrue) return callback(null, isTrue); 
    else return callback(err);
};

asyncFunction(true, cbFunc);
asyncFunction(false, cbFunc);

//이번에는 비동기가 아닌 내장 모듈을 사용하여 예외 처리를 살펴보겠습니다. 먼저 파일 시스템과 관련된 fs내장 모듈을 가져옵니다. 
const fs = require('fs');

//fs.readdirSync는 파일 시스템fs에서 동기 패턴으로 실행되는 함수입니다. 따라서 별도의 callback함수 없이 순서대로 실행됩니다. 결과값이 바로 fileList변수에 대입되고, 그 다음 줄에서 파일 정보들을 콘솔 출력합니다. 
//try블록 안에서 에러가 발생하면 catch로 에러 정보가 전달됩니다. 예제에서 undefined경로는 누가 일부러 만들어두지 않았다면, 해당 경로가 없다는 에러를 반환할 것입니다. 에러가 발생한 경우 한 번 더 에러 정보 여부를 확인하고, console.error로 에러 정보가 출력됩니다. 
try{
    const fileList = fs.readdirSync('/undefined/');
    fileList.forEach(f => console.log(f));
}catch(err){
    if(err) console.error(err);
}