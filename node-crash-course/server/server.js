const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request made'); // 이것은 클라이언트 측에서는 나오지 않는다. 
    console.log(req.url, req.method) // 리퀘스트 객체 받아보기. 여기서 url/에 추가된 내용을 우리는 받아볼 수 있을 것이다. 
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
})
//로컬호스트는 도메인 이름이다. 웹에서의. 
// 포트 넘버는 컴퓨터로 들어가는 문이라고 생각하면 된다. 