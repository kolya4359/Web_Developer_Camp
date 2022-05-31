# Section48: Express의 세션과 플래시

## 세선 개요

### HTTP 세션(session) 이란

세션이란 통신을 하기 위해 서로 연결된 순간부터 통신을 마칠 때까지의 기간을 의미한다.  
HTTP 세션이란 클라이언트가 웹서버에 연결된 순간부터 웹 브라우저를 닫아 서버와의 HTTP 통신을 끝낼 때까지의 기간이다.  
하지만 보통 세션이라고 말할 때는 서버에 세션에 대한 정보(세션 상태, 클라이언트 상태, 세션 데이터 등)를 저장해 놓고 세션 쿠키(고유한 세션 ID 값)를 클라이언트에게 주어 서버가 클라이언트를 식별할 수 있도록 하는 방식자체를 의미하는 경우가 많다.

### 세션의 특징

- 따로 용량의 제한이 없다. (서버의 능력에 따라 다를 수 있다.)
- 서버에 세션 객체를 생성하며 클라이언트마다 고유한 세션 ID 값을 부여한다.
- 쿠키를 사용하여 세션 ID 값을 클라이언트에 보낸다.
- 웹 브라우저가 종료되면 세션 쿠키는 삭제된다.

### 세션 작동방식

세션의 작동방식을 보면 우선 클라이언트가 서버에 요청을 보내면 서버에서는 요청헤더(Cookie)를 확인하고 세션 ID가 있는지 확인한다.  
만약 요청에 세션 ID가 없다면 서버에서는 세션 ID를 생성한 뒤 응답을 보낼 때 쿠키에 세션 ID를 담아 보낸다. (서버에서는 이때 가장 먼저 세션 객체를 생성하여 정보를 저장한다.)  
클라이언트는 응답에서 받은 세션 쿠키(세션 ID값)를 저장해두고, 매번 해당 서버에 요청을 보낼 때마다 세션 쿠키를 함께 보내서 자신이 누구인지 인증한다. 세션 쿠키는 브라우저가 종료되면 삭제된다.

![session](./imgs/%EC%84%B8%EC%85%98%20%EC%9E%91%EB%8F%99%EC%88%9C%EC%84%9C.png)

## 쿠키와 세션의 관계

흔히 쿠키와 세션을 비교할 때 쿠키는 클라이언트(웹 브라우저)에 정보를 저장하는 것이고, 세션은 서버에 정보를 저장하는 것이다 라고 비교한다. 맞는 말이지만 마치 서로 반대되는 개념처럼 오해할 수 있는데, 결국 세션은 쿠키를 이용하는 하나의 방식일 뿐이다. (쿠키와 세션은 방식의 차이일 뿐 반대 개념이 아니다.)
쿠키는 stateless한 HTTP 통신에서 클라이언트에게 정보(표시)를 주어 해당 클라이언트를 식별하기 위해 만들어졌다.  
클라이언트가 식별이 가능해야 서버는 특정 클라이언트와 계속해서 통신을 하고 있는지 확인이 가능하기 때문이다.  
하지만 클라이언트에 저장된다는 쿠키의 특징은 보안에 있어서 치명적인 단점이 있다.  
예를 들어 로그인을 위해 사용자가 입력한 아이디와 비밀번호를 쿠키에 담아 클라이언트에 저장한 뒤 서버에서는 쿠키로 해당 사용자가 로그인한 사용자인지 확인한다고 생각해보자. 그러면 누군가 마음만 먹으면 쿠키를 확인해 클라이언트에 저장된 아이디와 비밀번호를 볼 수 있다.  
그래서 세션이라는 개념을 통해 중요한 정보는 서버에서 관리하고 클라이언트에게는 세션 쿠키(세션 ID)를 주어 식별이 가능하다록 한 것이다.  
결론적으로 사전적 정의로 보면 세션(통신을 시작하고 마칠 때까지의 시간)을 유지하기 위해 쿠키를 사용하는 것인데, 용어 상으로는 세션이란 서버에 정보를 저장하고 세션 쿠키를 통해 클라이언트를 식별하는 방식을 통틀어 말하는 것으로 보면 되겠다.

## Express Session

세션을 사용할 때는 express-session 패키지를 설치한다.  
다음은 viewcount 경로에 몇 번 접속했는지 알려주는 예제이다.  
처음 들어가면 session의 값이 1이 되고 두 번째부터 1 씩 추가된다.

```js
// SessionDemo/index.js
const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({ secret: "thisisnotagoodsecret" }));
// cookie와 마찬가지로 비밀 키를 필요로 한다.

app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`You have viewed this page ${req.session.count} times`);
});

app.listen(3000, () => {
  console.loge("listening on port 3000");
});
```

세션을 이용해서 쿠키를 요청하면 connect.sid(connect.session.id)로 응답이 온다.  
세션은 서버에 저장되기 때문에 위의 예제를 구글에서 실행했을 때랑 safari에서 실행했을 때의 결과는 개별적으로 나타난다. 구글에서 session의 값이 5 가 되어도 safari에 처음 들어가면 1이 된다.

## Express Session 더 알아보기

세션의 여러가지 옵션에 대해 알아본다.

```js
// SessionDemo/index.js
const express = require("express");
const app = express();
const session = require("express-session");

const sessionoptions = {
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionoptions));

app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`You have viewed this page ${req.session.count} times`);
});

app.get("/register", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  const { username } = req.session;
  res.send(`Welcome back, ${username}`);
});

app.listen(3000, () => {
  console.loge("listening on port 3000");
});
```

- resave: default 값이 true이다. 요청 중 수정사항이 없더라도 세션이 세션 저장소에 다시 저장될 수 있게 한다.

아무것도 등록하지 않고 /greet로 이동하면 'Welcome back, undefined' 가 출력되지만, /register 로 이동하면 /greet로 리다이렉트 되고, 'Welcome back, Anonymous' 가 출력된다. /register?username=colt 경로로 이동하면 'Welcome back, colt' 가 출력된다.

## 플래시 개요

플래시는 기본적으로 세션에서 사용자에게 메시지를 출력해 내보내는 장소이다. 한 번 뜨고 사라지는 메시지를 뜻한다. 플래시를 사용할 땐 connect-flash나 express-flash 패키지를 설치해야 한다.  
플래시를 활용하는 경우로는 성공적으로 뭔가를 생성했을 때, 로그인, 로그아웃 시 메시지를 띄우는 경우 등 다양한 방법이 있다.

## Res.locals와 플래시

res.locals 는 요청에 대한 응답 로컬 변수를 갖는 객체이므로 요청-응답 주기 동안에만 렌더링 된다.
플래시를 일일이 하드코딩하기 번거롭기 때문에 좀 더 효율적으로 사용하는 방법을 알아보자.  
많은 방법 중 하나는 미들웨어를 설정하는 방법이다.

```js
app.use((req, res, next) => {
  res.locals.message = req.flash(success);
  next();
});
```

locals.message 에 flash()를 이용해 문구를 전달했으므로 다른 템플릿에서 <%= message %> 를 이용해서 flash 를 사용할 수 있다.
