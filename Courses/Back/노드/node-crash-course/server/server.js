const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // console.log('request made'); // 이것은 클라이언트 측에서는 나오지 않는다. 
    // console.log(req.url, req.method) // 리퀘스트 객체 받아보기. 여기서 url/에 추가된 내용을 우리는 받아볼 수 있을 것이다. 

    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    })

    greet()
    greet()

    //set header content type, 브라우저에게 되돌려 줄 것을 정의하는 것. 
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err)
            res.end()
        }else{
            // res.write(data);
            
            res.end(data) //write에 쓰지않고, end에 써도 같은 답을 받을 수 있다. 
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
})
//로컬호스트는 도메인 이름이다. 웹에서의. 
// 포트 넘버는 컴퓨터로 들어가는 문이라고 생각하면 된다. 