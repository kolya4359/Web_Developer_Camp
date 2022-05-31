# Section47: Express의 라우터와 쿠키

## Express 라우터 개요

### 라우터란?

라우터는 **클라이언트의 요청 경로(path)를 보고 이 요청을 처리할 수 있는 곳으로 기능을 전달해주는 역할** 을 한다. 이러한 역할을 **라우팅** 이라고 하는데, 애플리케이션 엔드 포인트(URI)의 정의, 그리고 URI가 클라이언트 요청에 응답하는 방식을 의미한다. 예를 들어, 클라이언트가 /users 경로로 요청을 보낸다면 이에 대한 응답 처리를 하는 함수를 별도로 분리해서 만든 다음 get()메소드를 호출하여 라우터를 등록할 수 있다.

### 라우터 사용하기

Express에선 이러한 라우터를 미들웨어로서 제공하고 있다. 다음과 같은 순서로 라우터 미들웨어를 사용할 수 있다.

1. 라우터 객체 참조
2. 라우팅 함수 등록
3. 라우터 객체를 app 객체에 등록

이를 실제 코드로 표현하면 다음과 같다.

```js
// 라우터 객체 참조
const router = express.Router();

// 라우팅 함수 등록
router.route('/process/login').get(...);
router.route('/process/login').post(...);
...

// 라우터 객체를 app 객체에 등록
app.use('/', router);
```

클라이언트에서 요청한 요청 경로에 따라 실행될 함수는 라우터(router) 객체를 사용해 등록한다.  
router 객체의 route()메서드를 통해 요청 경로를 지정할 수 있으며, get()이나 post() 등의 메소드를 호출하면 실행될 함수를 등록할 수 있다.

```js
router.route(요청 경로).get(실행될 함수);
router.route(요청 경로).post(실행될 함수);
```

요청 패스를 라우터 객체에 등록할 때 사용하는 메소드엔 get(callback), post(callback), put(callback), delete(callback), all(callback) 등이 있다.  
실제론 이렇게 하나의 파일 안에서 모든 라우팅 함수를 등록하는 것이 아니라, 각 경로 별로 라우팅 함수를 정의한 다음 그것을 하나의 파일로 묶어 모듈화시킨다.

```js
// Express/server.js
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/user", userRouter);
```

```js
// Express/routes/index.js
const router = express.Router();

router.get('/', (req, res) => {
    ...
});

module.exports = router;
```

```js
// Express/routes/user.js
const router = express.Router();

router.get('/', (req, res) => {
    ...
});

router.get('/:userId', (req, res) => {
    ...
});
...
module.exports = router;
```

### URL 파라미터 사용하기

URL 파라미터는 요청 파라미터(query string)와 달리 URL 주소의 일부로 들어간다.  
위의 routes/user.js에서 /:userId는 /user/ 뒤에 오는 값을 파라미터로 처리하겠다는 의미이다.  
이렇게 지정한 파라미터는 req.params 객체 안에 들어간다. 따라서 :userId으로 표시된 부분에 담겨 전달된 값은 req.params.userId 속성으로 접근할 수 있다. 이것을 바로 토큰(Token)이라고 부른다.

## Express 라우터와 미들웨어

express는 일련의 미들웨어(함수)로 이루어져 있다. 이 미들웨어는 요청, 응답 사이에서 부가적인 처리를 할 수 있고 다음 미들웨어의 실행권한을 가지게 된다.

```js
// routes/admin.js
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send("SORRY NOT AN ADMIN!");
});
// index.js 의 Admin 인증 미들웨어를 주석처리하고 사용하면
// admin 경로에서만 인증 미들웨어를 사용한다. 미들웨어를 독립적인 경로에서 사용할 때 사용하는 방법이다.

router.get("/topsecret", (req, res) => {
  res.send("THIS IS TOP SECRET");
});
// localhost:3000/admin/topsecret 경로로 이동하면 THIS IS TOP SECRET 문구가 출력된다.
router.get("/deleteeverything", (req, res) => {
  res.send("OK DELETED IT ALL!");
});

module.exports = router;
```

```js
// index.js
const express = require("express");
const app = express();
const shelterRoutes = require("./routes/shelters");
const dogRoutes = require("./routes/dogs");
const adminRoutes = require("./routes/admin");

app.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send("SORRY NOT AN ADMIN!");
});
// Admin 인증하는 미들웨어를 만들었다. 이 상태로 사용하면 밑에 세 개의 라우터 모두에 적용된다.

app.use("/shelters", shelterRoutes);
app.use("/dogs", dogRoutes);
// /dogs는 경로이고 dogRoutes 는 따로 분리한 라우터 파일이다.
app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("Serving app on localhost:3000");
});
```

## 쿠키 개요

### HTTP 쿠키(Cookie)란

HTTP 쿠키느느 웹 쿠키, 브라우저 쿠키로도 불리는데 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각을 의미한다.  
유닉스의 매직쿠키에서 개념이 유래하였고, 루 몬텔루라는 웹 브라우저 개발자가 웹 사이트에 접속한 클라이언트를 확인하기 위해 만들었다. HTTP 통신은 stateless하기 때문에 클라이언트를 확인하기 위해서는 쿠키라는 개념이 따로 필요했기 때문이다.  
쿠키는 주로 세션 관리(서버에서 관리하는 로그인 등의 정보를 의미), 개인 설정유지, 사용자 트래킹(사용자의 행동을 기록하고 분석하는 것) 용도로 사용된다.

> HTTP의 stateless란  
> stateless 라는 것은 번역하자면 상태가 없다는 뜻이다. HTTP에서 stateless 하다는 건 서버 입장에서 클라이언트의 상태가 없다는 의미로 동일한 클라이언트의 요청이라도 매번 각 요청은 독립적이라는 의미이다. 예를 들어 놀이공원(서버)에서 손님이 입장(요청)했다가 퇴장(응답)했을 때 손님들을 한명 한명 다 기억할 수가 없다. 그렇기 때문에 놀이공원에서는 재입장하는 손님을 구분하기 위해 팔찌같은 입장권을 준다.  
> 마찬가지로 서버에서도 이미 요청을 했었던 클라이언트인지 매번 확인하기 어렵기 때문에 입장권처럼 쿠키를 주는 것이다.

### 쿠키의 특징

- 쿠키는 한개에 4KB까지 저장 가능하며, 최대 300 개 까지 저장할 수 있는 텍스트 파일이다.
- 쿠키는 클라이언트에 저장된다.
- 쿠키에는 이름, 값, 만료날짜, 경로 정보가 들어있다.
- 기본적으로 쿠키는 웹 브라우저가 종료되면 삭제된다. (만료날짜를 지정해 주면 만료일이 돼야 삭제된다.)
- 웹 브라우저에 해당 서버의 쿠키 정보가 있으면 HTTP요청(HTTP 헤더의 Cookie)에 무조건 담아 보낸다.

### HTTP 쿠키 작동 방식

쿠키도 결국 HTTP 통신에서 이루어지는 것이기 때문에 HTTP 의 응답과 요청에 따라 작동한다.  
요청을 받은 서버에서 쿠키를 클라이언트(웹 브라우저)로 보내고 클라이언트는 쿠키를 받으면 도메인 서버 이름으로 정렬된 쿠키 디렉토리에 쿠키(정보)를 저장한다. 이후 클라이언트가 동일한 서버로 HTTP 요청을 보내면 저장된 쿠키도 같이 전송되며, 만약 서버에서 쿠키에 업데이트된 내용이 있으면 응답할 때 다시 업데이트된 쿠키를 보내준다.

![cookie](./imgs/%EC%BF%A0%ED%82%A4%20%EC%9E%91%EB%8F%99%EC%88%9C%EC%84%9C.png)

## 쿠키 보내기

Express로 쿠키를 설정하는 법을 살펴본다.

```js
// cookieDemo/index.js
const express = require("express");
const app = express();

app.get("/setname", (req, res) => {
  res.cookie("name", "stevie chicks");
  // 응답으로 name 값이 stevie chicks 인 쿠키가 들어온다.
});

app.get("/greet", (req, res) => {
  res.send("HEY THERE!");
});

app.listen(3000, () => {
  console.log("SERVING!");
});
```

## 쿠키 파서 미들웨어

쿠키를 파싱할면 cookie-parser라는 패키지를 사용해야 한다.

```js
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/greet", (req, res) => {
  const { name = "No-name" } = req.cookies;
  res.send(`Hey there, ${name}`);
});
```

## 쿠키 서명하기

쿠키에 서명을 한다는 것은 암호화 시킨다는 것이 아니라 클라이언트나 브라우저에게 보낸 원본 데이터와 우리가 돌려받은 데이터가 일치하는지 확인하기 위한 조작 방지 봉인 같은 것이다. 쿠키 파서를 이용해 서명된 쿠키를 보내면 받는 쪽에서 쿠키 파서를 이용해 서명을 비교하여 조작이 있는 지 없는 지 확인한다. 서명이 일치하지 않으면 조작이 있다고 판단한다.

```js
const cookieParser = require("cookie-parser");

app.use(cookieParser("thisismysecret"));
// cookieParser(이 부분에 비밀 키를 작성). 원래는 파일 안에 있으면 안되고 환경변수에 넣어준다.
// 이 비밀 키가 쿠키 파서가 쿠키에 사인할 때 쓰인다.

app.get("/setname", (req, res) => {
  res.cookie("name", "henrietta");
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
});
```

쿠키 파서를 이용해서 서명된 쿠키는 그냥 출력했을 땐 나오지 않고 비밀 키를 전달할 때에만 존재한다. 이는 일반적인 무서명 쿠키와 서명된 쿠키를 명확히 구분하기 위해서이다.  
서명된 쿠키의 값을 수동으로 변경하면 서명된 쿠키를 확인할 때 값이 false 로 나타난다. 원본과 다르다는 뜻이다.  
비밀 키를 변경할 경우 변경 전의 비밀 키로 서명되었던 모든 쿠키가 무효화된다.
