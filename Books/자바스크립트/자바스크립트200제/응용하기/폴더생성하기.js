"use strict"

//노드의 파일 시스템 모듈을 가지고 옵니다.
const fs = require('fs');

//checkDir함수를 작성합니다. 명시한 경로의 파일 또는 폴더의 정보를 확인하는 함수입니다. 매개변수는 첫 번째 변수 path경로 값을 가져오고, 두 번쨰 callbck 변수로 결과를 리턴합니다. 
const checkDir = (path, callback) => {

    //fs.stat은 대입된 path경로값의 파일 존재 여부를 확인할 수 있습니다. 확인된 결과값은 fs.stats클래스로 래핑되어 콜백 함수로 전달됩니다. 이 클래스는 해당 경로의 파일이 isFile(), isDirectory(), isFIFO()등 간단한 함수로 파일 정보를 제공합니다. 
    fs.stat(path, (err, stats) => {
        //해당 경로에 어떤 파일도 존재하이 않은 경우, fs.stat모듈은 상태 정보가 없어 에러를 반환합니다. 이 에러는 Error객체로 code정보가 ENOENT로 정의되어 전달됩니다. 그러나 checkDir함수에서는 이 상태가 새로운 폴더를 만들기에 적합하기 떄문에 true를 전달하는 것이 맞습니다. 
        if(err && err.code === 'ENOENT') return callback(null, true);
        if(err) return callback(err);

        //에러 없이 파일 정보를 가져온 뒤 stats.isDirectory()를 확인합니다. checkDir함수의 의도는 현재 경로에서 정상적으로 새로운 폴더를 생성 가능한지 확인하는 함수입니다. isDirectory()로 true가 반홚되면 이미 동일한 폴더가 있다는 뜻이기 때문에, checkDir함수는 false를 리턴해야합니다. !논리 부정연산자로 isDirectory결과의 반대값을 리턴합니다.  
        return callback(null, !stats.isDirectory());
    })
}

//예제의 실행을 위해 현재 위치로 경로를 가져옵니다. Node.js는 global변수는 활용할 수 있는데, 이 값은 미리 선언하지 않아도 바로 사용가능합니다. 
const currentPath = __dirname;
let path = `${currentPath}/js200`;

checkDir(path, (err, isTrue) => {
    if(err) return console.log(err);

    if(!isTrue) {
        console.log('이미 동일한 디렉터리가 있습니다. 디렉터명을 변경합니다.');
        path = `${currentPath}/js200-new`;
    }

    //fs,mkdir모듈은 새로운 폴더를 생성합니다. 인자로 넣은 경로로 폴더를 생성하고, 에러가 발생되면 콜백 함수로 에러 정보를 반환합니다. 
    fs.mkdir(path, (err) => {
        if(err) console.log(err);

        console.log(`${path} 경로로 디렉터리를 생성했습니다.`)
    })
})

//폴더를 생성하는 예제로 간단하게 fs.stat모듈을 사용했습니다. 그러나 fs.open(), fs.readFile(), fs.writeFile()와 같이 파일을 직접 접근할 떄에는 fs.stat모듈 사용을 권장하지 않습니다. 파일을 직접 읽고 쓰기 시에는 반드시 접근 권환을 확인해야 하므로 이 경우에는 fs.access 모듈 사용을 권장합니다. 

