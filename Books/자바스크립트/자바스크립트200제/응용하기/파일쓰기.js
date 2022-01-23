//fs모듈을 활용할 때 형제처럼 같이 활용되는 모듈이 바로 path입니다. path 모듈은 파일/폴더 경로와 관련된 모듈입니다. 앞에 작성했던 것처럼 구분자를 넣어 직접 문자열 경로를 작성할 수도 있지만, 개발하다보면 의도치않은 값이 대입되거나 누락되어 잘못된 경로가 반환될 수 있습니다. 이처럼 개발자의 실수를 방지하고, 경로에서 확장자명 또는 파일명만 추출하는 등의 좀더 나은 편의성을 위해 path 모듈을 사용합니다. 

//fs모듈과 path 모듈을 활용하여 새로운 파일을 만들고, 이미 동일한 파일이 있는 경우에는 내용을 추가 수정해 보겠습니다. 

'use strict';

const fs = require('fs');
const path = require('path');

//이 함수는 파일을 새로 생성하는 fs.writeFile을 호출합니다. 첫 번째 인자에 path 경로 값을 넣고, 두 번째 인자에는 파일 내용 'New file, New content'문자열을, 세 번째 인자에는 파일 인코딩 정도 uft8을 넣습니다. 인자 값을 토대로 새로운 파일을 생성하는 fs.write함수를 실행합니다. 실행 경과는 마지막 인자 콜백 함수로 전달됩니다. 
const makeFile = (path, callback) => {
    fs.writeFile(path, 'New file, New content', 'utf8', (err) => {
        if(err) return callback(err);

        console.log('파일이 생성됐습니다.');
        callback(null);
    })
}

//이 함수는 기존 파일에 내용을 추가하는 함수입니다. fs.appendFile함수를 사용하여, 매개변수로 전달된 path경로에 '\nUpdate file'문자열을 추가합니다. fs.appendFile로 내용을 추가한 후, 콜백 함수가 실행됩니다. 에러가 발생되면 콜백함수 17라인을 통해 에러를 반환하고, 에러가 없으면 19-20라인 코드가 실행됩니다. 
const appendFile = (path, callback) => {
    fs.appendFile(path, '\nUpdate file', (err) => {
        if(err) return callback(err);

        console.log('파일 내용을 추가합니다.');
        callback(null);
    })
}

const printErrIfExist = (err) => {
    if(err) console.log(err);
}

//파일 경로를 생성합니다. 현재 파일이 있는 폴더 경로 __dirname과, 파일이 위치할 폴더명, 그리고 파일명을 path.join함수 인자로 넣습니다. path모듈의 join 함수는 대입된 매개변수들을 일관된 구분자를 두고 순서대로 하나의 문자열로 합칩니다. 따라서 filePath변수에 hello.txt문자열이 반환됩니다. 
const filePath = path.join(__dirname, 'js200', 'hellow.txt');


//fs.open함수를 호출합니다. 이 함수는 특정 경로의 파일 또는 폴더의 존재 여부를 확인하기 위해 사용하는데, flag값을 넣음으로써 파일 전급 권한을 동시에 확인할 수 있습니다. 여기서 대입된 flag는 wx입니다. 쓰기 접근 권한을 확인하며, 이미 해당 경로로 동일한 파일이 있는 경우 에러를 반환합니다. 
fs.open(filePath, 'wx', (err, fd) => {
    if(err & err.code === 'EEXIST')
        return appendFile(filePath, (err) => printErrIfExist(Err));
    if(err) return callback(err);

    return makeFile(filePath, (err) => printErrIfExist(err));
})