# 요청과 응답이해하기

```javascript
const http = require("http")

http.createSever((req, res) => {
  //여기에 어떻게 응답할지를 적는다.
})
```

- http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있으므로 Http 모듈을 사용했다.
- http 모듈에는 createServer 메서드가 있다.
  - 인수로 요청에 대한 콜백 함수를 넣을 수 있고, 요청이 들어올 때마다 매번 콜백 함수가 실행된다.
- res객체는 요청에 대한 정보들, res객체는 응답에 대한 정보들을 담고 있다.

```javascript
const http = require("http")

http
  .createSever((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    res.write("<h1>Hello Node!</h1>")
    res.end("<p>Hello Server!</p>")
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기중입니다")
  })
```

- 포트는 서버 내에서 프로세스를 구분하는 번호다. 서버는 HTTP 요청을 대기하는 것 외에도 다양한 작업을 한다.
  - 데이터베이스와 통신하고, FTP요청을 처리하기도 한다.
  - 따라서 서버는 프로세스에 포트를 다르게 할당하여 들어오는 요청을 구분한다.
- res.writeHead는 응답에 대한 정보를 기록하는 메서드이다.
  - 첫 번째 인수로 성공적인 요청임을 의미하는 200을, 두번 째 인수로 응답에 대한 정보를 보내는데 콘텐츠의 형식이 HTML임을 알리고 있다.
  - 또한 한글 표시를 위해 charset을 utf-8로 지정했다.
  - 이 정보가 기록되는 부분을 헤더라고 한다.
- rew.write 메서드의 첫번째 인수는 클라이언트로 보낼 데이터이다.

> 응답은 무조건 보내야 한다. 요청이 성공했든 실패했든 응답을 클라이언트로 보내서 요청이 마무리되었음을 알려야 한다. 응답을 보내지 않는다면, 클라이언트는 서버로부터 응답이 오길 하염없이 기다리다가 일정 시간 후 타임아웃 될 것이다.

<br>

# REST와 라우팅 사용하기

- 서버에 요청을 보낼 때는 주소를 통해 요청의 내용을 표현한다.
- REST는 REpresentaional State Transfer의 줄임말이다.
  - 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킨다.
  - 일종의 약속이다.
- 주소는 명사로 구성된다.

- GET : 서버 자원을 가져오고자 할 때 사용한다. 요청의 본문에 데이터를 넣지 않는다. 데이터를 서버로 보내야 한다면 쿼리 스트링을 사용한다.
- POST : 서버에 자원을 새로 등록하고자 할 때 사용한다. 요청의 본문에 새로 등록할 데이터를 넣어 보낸다.
- PUT : 서버의 자원을 요청에 들어 있는 자원으로 치환하고자 할 떄 사용한다. 요청의 본문에 치환할 데이터를 넣어 보낸다.
- PATCH : 서버 자원의 일부만 수정하고자 할 때 사용한다. 요청의 본문에 일부 수정할 데이터를 넣어보낸다.
- DELETE : 서버의 자원을 삭제하고자 할 때 사용한다.

<br>

- GET 메서드 같은 경우에는 브라우저에서 캐싱할 수도 있으므로 같은 주소로 GET요청을 할 때 서버에서 가져오는 것이 아니라 캐시에서 가져올 수도 있다.

```javascript
const http = require("http")
const fs = require("fs").promises

http
  .createServer(async (req, res) => {
    try {
      console.log(req.method, req.url)
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./restFront.html")
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
          return res.end(data)
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html")
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
          return res.end(data)
        }
      }

      try {
        const data = await fs.readFile(`.${req.url}`)
        return res.end(data)
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Round Error
      }
      res.writeHead(404)
      return res.end("NOT FOUND")
    } catch (err) {
      console.log(err)
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" })
      res.end(err.message)
    }
  })
  .listen(8082, () => {
    console.log("8082번 포트에서 서버 대기 중입니다. ")
  })
```

- req.method로 HTTP 요청 메서드를 구분하고 있다.
- GET이면 다시 req.url로 요청 주소를 구분한다.

<br>

# 쿠키와 세션 이해하기

- 클라이언트가 누구인지 기억하기 위해 서버는 요청에 대한 응답을 할 때 쿠키라는 것을 같이 보낸다.
- 쿠키는 유효 기간이 있으며 name = zerocho와 같이 단순한 '키-값'의 쌍이다.
- 서버로부터 쿠키가 오면 웹브라우저는 쿠키를 저장해두었다가 다음에 요청할 때마다 쿠키를 동봉해서 보낸다.
- 서버는 요청에 들어있는 쿠키를 읽어서 사용자가 누구인지를 파악한다.
- 브라우저는 쿠키가 있다면 자동으로 동봉해서 보내주므로 따로 처리할 필요가 없다. 서버에서 브라우저로 쿠키를 보낼 때맏 코드를 작성하여 처리하면 된다.
- 즉, 서버는 미리 클라이언트에 요청자를 추정할 만한 정보를 쿠키로 만들어 보내고, 그다음부터는 클라이언트로부터 쿠키를 받아 요청자를 파악한다.
- 쿠키가 여러분이 누구인지 추적하고 있는 것이다. 개인정보 유출 방지를 위해 쿠키를 주기적으로 지우라고 권고하는 것은 바로 이런 이유때문이다.
- 쿠키는 요청의 헤더에 담겨 전송된다.

```javascript
const http = require("http")

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie)
    res.writeHead(200, { "Set-Cookie": "mycookie=test" })
    res.end("Hello Cookie")
  })
  .listen(8083, () => {
    console.log("8083번 포트에서 서버 대기 중입니다!")
  })
```

- 쿠키는 name=zerocho;year=1994처럼 문자열 형식으로 존재한다. 쿠키 간에는 세미콜론으로 구분된다.
- 쿠키는 req.headers.cookie에 들어있다.
- 쿠키는 요청과 응답의 헤더를 통해 오간다.
- 응답의 헤더에 쿠키를 기록해야 하므로 res.writeHead 메서드를 사용했다.
- Set-Cookie는 브라우저한테 다음과 같은 값의 쿠키를 저장하라는 의미이다.
- 실제로 응답을 받은 브라우저는 mycookie=test라는 쿠키를 저장한다.

<br>

# Https와 Http2

```javascript
const http = require("https")
const fs = require("fs")

https
  .createServer(
    {
      cert: fs.readFileSync("도메인 인증서 경로"),
      key: fs.readFileSync("도메인 비밀키 경로"),
      ca: [
        fs.readFileSync("상위 인증서 경로"),
        fs.readFileSync("상위 인증서 경로"),
      ],
    },
    (req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
      res.write("<h1>Hello Node!</h1>")
      res.end("<p>Hello Server!</p>")
    }
  )
  .listen(443, () => {
    console.log("443번 포트에서 서버 대기 중입니다.")
  })
```

<br>

# Cluster

- cluster 모듈은 기본적으로 싱글 프로세스로 동작하는 노드가 cpu코어를 모두 사용할 수 있게 해주는 모듈이다.
- 포트를 공유하는 노드 프로세스를 여러 개 둘 수도 있으므로, 요청이 많이 들어왔을 때 병렬로 실핼ㅇ된 서버의 개수만큼 요청이 분산되게 할 수 있다.
- 서버에 무리가 덜가는 셈이다.
- 메모리를 공유하지 못하는 단점이 있다.

```javascript
const cluster = require('cluster');
const http = require('http')
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디 : ${process.pid}`);
    for(let i = 0; i < numCPUs; i += 1){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
    });
}else{
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type' => 'text/html; charset=utf-8'})
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>')
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`)
}
```
