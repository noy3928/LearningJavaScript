/*
노드.js에는 두 가지 종류의 이벤트가 있습니다. 
1.시스템 이벤트 - libuv : 컴퓨터에서 시스템적으로 발생되는 이벤트가 있습니다. 
예를 들어, 파일 읽기, 파일 열기, 인터넷에서 데이터 받기 등입니다. 컴퓨터 시스템적으로 수행되는 이벤트들을 노드에서 libuv라는 이름의 라이브러리가 구현되어 이를 처리합니다. 
이 libuv는 c++로 작성된 node.js 코어 라이브러리 입니다. 시스템 상의 이벤트이기 때문에 자바스크립트가 아닌 c++코드로 작성되어 있습니다. 

2.custom Events : 시스템 상 이벤트를 떠나, 직접 구현하여 만들 수 있는 이벤트가 있습니다. 직접 작성된 이벤트를 다루는 것이므로 자바스크립트로 작성된 라이브러리가 
수행됩니다. 즉, node.js의 evnet Emitter와 관련된 내장 모듈이 바로 이 이벤트들을 처리해줍니다. 
*/

const Emitter = require('events');
const eventConfig = require('./config').events;
const em = new Emitter();

em.on(eventConfig.GREET, () => {
    console.log('Somewhere, someone said hello.');
});

em.on(eventConfig.GREET, () => {
    console.log('A Greeting occoured!');
})

em.emit(eventConfig.GREET);