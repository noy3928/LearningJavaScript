//es6모듈 시스템에서는 default 키워드를 사용하여 모듈에서 기본으로 내보내는 값을 정의할 수 있습니다. 숫자, 문자, 불리언과 같은 기본형 값과 객체, 함수, 클래스와 같은 참조형 값 모두 올 수 있습니다.

export default 'hello';
export default function hello(name) {
    console.log('hello'+ name);
};

export default class Hello {
    constructor (greeting){
        this.greeting = greeting;
    }
    hi(name){
        console.log(`${this.greeting} ${name}`);
    }
}

//default 키워드 사용에 있어 중요한 점이 있는데, default 키워드는 하나의 모듈에서 한 번만 사용할 수 있습니다. 즉 한 파일에서는 하나의 값만 default로 정의할 수 있습니다. 위와 같이 정의한 모듈의 기본값은 다른 모듈에서 다음과 같이 불러올 수 있습니다. 


//hello.js에서 default로 내보낸 값을 가져오고 import하는 모듈에서 (현재파일) 이름을 부여합니다. 여기에는 hello라는 이름으로 부여하였습니다. 
import Hello from './hello.js';


//hello.js에서는 클래스를 기본값으로 내보냈기 때문에 new 키워드를 사용하여 객체를 생성합니다. 
const koreanHi = new Hello('안녕하세요');
//Hello 클래스의 인스턴스인 koreanHi의 hi 메소드를 호출합니다. 
koreanHi.hi('하린')



////------------------------------<모듈을 여러 이름을 가지고 내보내고 가져오기 챕터.58> -----------------------------------

//es6모듈 시스템에서는 이름 있는 변수나 함수 혹은 클래스를 export키워드를 사용하여 내보낼 수 있습니다. 기본값default과 다르게 이름이 있기 때문에 중복되지 않는 한 여러 이름있는 것들을 내보낼 수 있습니다. 

//const키워드 version이름으로 상수를 정의하였습니다. 그리고 export키워드로 정의된 상수의 이름인 version으로 내보냈습니다. 
export const version = 'v1.0';

//personA이름으로 정의된 변수에 객체를 할당하였습니다. 이 변수 또한 personA이름으로 내보냈습니다. 
export var personA = {
    name: 'a'
};

//add 함수를 선언하고 선언된 함수의 이름으로 내보냅니다. 
export function add(a,b){
    return a + b;
}

export class Person{
    constructor(name){
        this.name = name; 
    }
}


//위의 예제에서 내보낸 이름들은 다음과 같이 다른 모듈에서 불러올 수 있습니다. 
import {add, Person, version} from './hellojs';

const result = add(1,2);
const harin = new Person('하린');

console.log(result);
console.log(harin.name);
console.log(version);


//-----------------------------------  <모듈을 다양한 방식으로 사용하기 챕터. 59> -----------------------------------

export const version = 'v1.0';
//version.js모듈로부터 version이름으로 내보낸 상수값을 가져오는데, 이때 as 키워드를 사용하면 현재 모듈에서 다른 이름으로 사용할 수 있습니다. 
import {version as moduleVersion} from './version.js';

//version이라는 이름으로 이미 선언 했기 때문에 vesion을 가져올 수 없습니다. 그래서 version.js에서 내보낸 version이름을 moduleVersion으로 바꿔 가져옵니다. 그리고 moduleVersion의 값을 콘솔에 출력합니다. 
const version = 'v0';
console.log(moduleVersion);

//as키워드는 export할 때도 사용할 수 있습니다. 먼저 선언된 이름들을 마지막에 export할 때 다음과 같이 as 키워드로 다른 이름으로 내보낼 수 있습니다. 
const version = 'v1.0';
export {version as ver};

//다른 모듈을 가지고 올 때 별표를 이용하거나 다른 모듈의 코드를 실행만 시킬 수도 있습니다. 
// add함수를 모듈의 기본으로 정의합니다. 그리고 version변수를 내보냅니다. 
export default function add(a,b){
    return a + b; 
}
export const version = 'v1.0';

//---------------이 함수가 저장된 파일은 './sideeffect.js'
console.log('hello');
window.hello = function hello(name){
    console.log('hello' + name);
}
//여기에서는 외부로 내보내는 값이 없이 콘솔에 출력하거나 전역 객체인 window에 메소드로 hello를 선언합니다. 이렇게 window에 메소드를 추가하면 window를 통하지 않고 직접 해당 메소드의 호출이 가능합니다. 

////----------app2.js
//add.js모듈을 *를 이용하여 전체를 가져옵니다. 이때 가져온 모듈 전체를 가리키는 이름이 있어야하기 때문에 as를 사용하여 이름을 주게 되는데, 여기에서는 add라고 이름을 주었습니다. 
import * as add from './add.js';
//sideeffect.js모듈을 실행합니다. from키워드 없이 작성하였기 때문에 해당 자바스크립트만 하고 어떠한 것도 가져오지 않습니다. 해당 모듈이 실행되기 때문에 콘솔에 'hello!'라고 출력되고 hello라는 함수가 전역으로 선언됩니다. 
import './sideeffect.js';

//add라는 이름으로 add.js 모듈을 가리키기 때문에 add는 모듈 객체이고 속성으로는 default와 version이 있습니다. 
console.log(add.version);
const added = add.default(1,2);
console.log(added);

//2번쨰 줄에서 './sideeffect.js';가져 왔기 때문에 전역에 선언된 hello함수를 사용할 수 있습니다. 
hello('harin');

//-----------value.js
export let value = 1;
setTimeout(()=> {
    value ++;
}, 1000);
//value변수에 1을 할당합니다. 1초 후에 value변수를 1증가시켜 value에는 2가 할당됩니다. 

//------------app.js
import {value} from './value.js';
console.log(value);
setTimeout(()=> console.log(value),2000);
//value.js모듈로부터 value를 가지고 와 콘솔에 출력합니다. 이때 1이 출력됩니다. 
//2초 후에 다시한번 value값을 콘솔에 출력합니다. 이때2가 출력되는데, 이는 value.js모듈에서 1초 후에 값을 1증가시켰기 때문에 변경된 값으로 콘솔에 출력됩니다. 만약 값이 복제되었다면 그대로 1이 출력되었을 것입니다. 

//브라우저의 콘솔에서 확인하면 처음에 1이 출력되고 2초후에 2가 출력됩니다. 


