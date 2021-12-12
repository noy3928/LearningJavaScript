const fs = require('fs');
const { Z_FIXED } = require('zlib');

//reading files
fs.readFile('./docs/blog1.txt', (err, data) => {
    //첫번째 인자로는 읽을 파일의 주소를 넘기고, 두번째 인자로는 파일을 읽고 났을 때 행할 행동을 넣어준다. 콜백. 콜백에서 첫번째 인자는 에러, 두번째 인자는 읽을 데이터.
    if(err) {
        console.log(err);
    }
    console.log(data.toString()); // 데이터로 읽어온 파일을 읽을 수 있는 형식으로 바꿔준다. 
})

// console.log('last line');

//writing files
fs.writeFile('./docs/blog1.txt', 'hello, world', () => {
    console.log('file was written');
})

fs.writeFile('./docs/blog2.txt', 'hello, again', () => {
    console.log('file was written')
})

//directories 
if(!fs.existsSync('./assets')){
    // assets가 존재하는지 확인하고서, 파일을 생성한다. 
    fs.mkdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('folder created')
    })
}else{
    // 만약에 존재하면 지운다. 
    fs.rmdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('folder deleted')
    })
}

// deleting files
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err)
        }
        console.log(' file deleted ')
    })
}
