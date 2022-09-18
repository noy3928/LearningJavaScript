# 미들웨어

- next 라는 세번째 매개변수
- next를 실행하지 않으면 다음 미들웨어가 실행되지 않는다.
- 에러처리 미들웨어는 매개변수가 4개다. 모든 매개변수를 사용하지 않아도 반드시 4개여야 한다.

- static 미들웨어는 정적인 파일들을 제공하는 라우터 역할을 한다.
  - 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정하면 된다.
  - public 폴더를 만들고 css나 js, 이미지 파일들을 public 폴더에 넣으면 브라우저에서 접근할 수 있게 된다.

### body-parser :

- req.body 객체로 만들어주는 미들웨어

# Router 객체로 라우팅 분리하기

- 익스프레스를 사용하는 이유 중 하나는 바로 라우팅을 깔끔하게 관리할 수 있다는 점이다.
- routes 폴더를 만들고 그 안에 index.js와 user.js를 작성한다.

```javascript
// index.js
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hello, Express")
})

module.exports = router
```

```javascript
// user.js

const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hello, User")
})

module.exports = router
```

```javascript
// app.js

const path = require('path');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

...

app.use('/', indexRouter)
app.use('/user', userRouter);

app.use((req,res,next)=>{
    res.status(404).send('Not Found');
})

```

- next 함수에 다음 라우터로 넘어가는 기능이 있다.
  - next('route')이다.

```javascript
router.get(
  "/",
  function (req, res, next) {
    next("route")
  },
  function (req, res, next) {
    console.log("실행되지 않습니다")
    next()
  },
  function (req, res, next) {
    console.log("실행되지 않습니다")
    next()
  }
)

router.get("/", function (req, res) {
  console.log("실행됩니다")
  res.send("Hello, Express")
})
```

<br>

```javascript
router.get("user/:id", function (req, res) {
  console.log(req.params, req.query)
})
```

- req.params안에 :id의 값이 들어있다.
- :id면 req.params.id로 :type이면 req.params.type으로 조회할 수 있다.
- 다만 이런 패턴은 모든 라우터의 가장 뒤에 위치해야한다.
- 퀴리스트링도 쓸 수 있다.
  - /users/123?limit=5&skip=10 이라는 주소의 요청이 들어오면

```javascript
{id:'123'} {limit:'5', skip:'10'}
```

과 같은 객체로 나타난다.

<br>

# Req, res 객체 살펴보기

- req.app : req 객체를 통해 app 객체에 접근할 수 있다. req.app.get('port')와 같은 식으로 사용할 수 있다.
- req.body : body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체다.
- req.cookies : cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체이다.
- req.ip : 요청의 ip주소가 담겨있다.
- req.params : 라우트 매개변수에 대한 정보가 담긴 객체다.
- req.query : 퀴리스트링에 대한 정보가 담긴 객체다.
- req.signedCookies : 서명된 쿠키들은 req.cookies 대신 여기에 담겨있다.
- req.get(헤더 이름) : 헤더의 값을 가져오고 싶을 때 사용하는 메서드다.

<br>

- res.app : req.app 처럼 res 객체를 통해 app 객체에 접근할 수 있다.
- res.cookie(키, 값, 옵션) : 쿠키를 설정하는 메서드이다.
- res.clearCookie(키, 값, 옵션) : 쿠키를 제거하는 메서드이다.
- res.end() : 데이터 없이 응답을 보낸다.
- res.json(JSON) : JSON 형식의 응답을 보낸다.
- res.render(뷰, 데이터) : 다음 절에서 다룰 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드이다.
- res.send(데이터) : 데이터와 함께 응답을 보낸다. 데이터는 문자열일수도 있고 HTML일수도 있고, 버퍼일 수도 있고, 객체나 배열일 수도 있다.
- res.sendFile(경로) : 경로에 위치한 파일을 응답한다.
- res.set(헤더, 값) : 응답의 헤더를 설정한다.
- res.status(코드) : 응답 시의 HTTP 상태 코드를 지정한다.

```javascript
res.status(201).cookie("test", "test").redirect("/admin")
```

- 체이닝도 가능하다.

<br>

# 템플릿 엔진 사용하기
