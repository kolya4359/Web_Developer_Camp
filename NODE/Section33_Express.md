# Section33 : Express로 서버 제작하기

## Express 개요

> Node.js를 위한 빠르고 개방적인 간결한 웹 프레임워크

Express는 Nodejs의 표준 웹서버 프레임워크로 불려질 만큼 많은 곳에서 사용하고 있다. 프레임워크로서 웹 애플리케이션을 만들기 위한 각종 라이브러리와 미들웨어 등이 내장돼 있어 개발하기 편하고, 수많은 개발자들에게 개발 규칙을 강제하여 코드 및 구조의 통일성을 향상시킬 수 있다. 그것이 바로 프레임워크 도입의 가장 큰 장점이다.

## 우리의 첫 번째 Express 앱

npm init -y 명령어를 사용하면 package.json을 만들때 나오는 질문들을 스킵할 수 있다. npm i express로 express를 설치해준다.

```js
// index.js
const express = require("express");
const app = express();
// app 이라는 변수에 express() 함수를 넣는다.

app.use(() => {
  console.log("WE GOT A NEW REQUEST!!");
});
// app.use의 작동 방식은 요청이 들어오면 콜백이 실행된다.

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
// listen메서드를 사용해서 포트를 연결하고, 연결이 된 후 실행될 콜백을 작성한다.
```

포트의 핵심은 다른 포트에 다른 서버를 가져서 고유의 출입문을 갖는다는 것이다. 그래서 여러 개의 서버를 실행한다면 각각 다른 포트를 지정해줘야 한다.

## 요청 및 응답 객체

콘텐츠로 응답하기 위해서는 우선 중요한 두 가지 객체를 알아야 한다.  
첫 번째는 들어오는 요청을 의미하는 객체이고 두 번째는 응답을 의미하는 객체이다.

```js
// index.js
const express = require("express");
const app = express();

app.use((req, res) => {
  console.log("WE GOT A NEW REQUEST!!");
  // res.send("HEELO, WE GOT YOUR REQUEST! THIS IS A RESPONSE!!");
  // res.send({ color: "red" });
  // 요청은 문자열도 되고 JavaScript 객체도 된다. JavaScript 객체를 요청하면 자동으로 JSON으로 변환되어 온다. header에서 확인할 수 있다.
  res.send("<h1>This is my webpage!!</h1>");
  // HTML을 담은 문자열을 요청하면 웹페이지에 h1 태그의 문자열이 출력된다.
});

app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080");
});
```

HTTP 요청은 JavaScript 객체가 아니라 텍스트 정보이다. 하지만 Express는 그걸 데이터로 변환한다. 파싱해서 전달할 객체로 변환하는 것이다. 위의 예제에서는 app.use의 콜백 함수에 전달된다.  
여기서 중요한 것은 Express가 자동으로 HTTP 요청 정보를 파싱해 JavaScript 객체를 만들고 그걸 콜백의 첫 번째 인수(req)로 전달한다는 점이다.  
res.send는 HTTP 응답을 보내고 생성해야 한다. 각각 두 개의 객체를 전달한다. 두 객체를 전달하면 요청 객체는 들어오는 요청인 HTTP 요청을 받아들이고 응답 객체의 경우는 요청을 한 누군가에게 보내질 응답을 생성하는데 쓰인다. 거기엔 send 같은 메서드가 있다.  
res.send는 응답을 보낼 때마다 하나의 요청으로 끝난다.

## Express 라우팅 기초

라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드 (GET, POST)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말한다.  
각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 이러한 함수는 라우트가 일치할 때 실행된다.

> app.METHOD(PATH, HANDLER)

- app은 express의 인스턴스이다.
- METHOD는 HTTP요청 메소드이다.
- PATH는 서버에서의 경로이다.
- HANDLER는 라우트가 일치할 때 실행되는 함수이다.

```js
// index.js
const express = require("express");
const app = express();

app.use((req, res) => {
  console.log("WE GOT A NEW REQUEST!!");
  res.send("<h1>This is my webpage!!</h1>");
});

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

app.post("/cats", (req, res) => {
  res.send("POST REQUEST TO /cats!! THIS IS DIFFEFENT THAN A GET REQUEST!");
});

app.get("/cats", (req, res) => {
  res.send("MEOW!!");
});
// 같은 /cats 로 요청을 보내도 post로 보내는지 get으로 보내는지에 따라 응답이 다르다.

app.get("/dogs", (req, res) => {
  res.send("WOOF!!");
});
// localhost:3000/dogs 로 요청하면 WOOF!! 라는 문자열이 웹 페이지에 출력된다.

app.get("*", (req, res) => {
  res.send(`I dont't know that path!`);
});
// 존재하지 않는 라우트를 요청하면 Express로부터 Cannot get 응답을 받는다. 상태 코드 404(Not Found)인 경우이다.

app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080");
});
```

## Express 경로 매개 변수

> Route parameter란 url안의 특정 위치에서 변수를 추출하기 위한 URL segment라고 불리는 것이다.

```js
app.get("/users/:userId/books/:bookId", (req, res) => {
  // res.send(req.params); // {"userId": "34", "bookId": "8989"}
  const { userId, bookId } = req.params;
  res.send(`<h1>Viewing BookID: ${bookId} on the ${userId}</h1>`);
  // 구조 분해 할당으로 따로 변수에 저장할 수도 있다.
});
```

user의 번호와 특정 책의 번호를 주기 위한 url이며 그 url에서 특정 변수를 추출해내서 사용할 수 있다.  
변수 이름은 위와 같이 :변수명 을 이용해서 추출할 수 있다.  
또한 하이픈(-)과 점(.)은 문자 그대로 해석되기 때문에 유용하게 사용할 수 있다.

## 쿼리 문자열

쿼리란 URL의 일부로 ? 뒤에 위치하며 쿼리 문자열의 한 부분으로써 키-값 쌍으로도 정보를 담는다.

```js
app.get("/search", (res, req) => {
  const { q } = req.query;
  if (!q) {
    res.send("NOTHING FOUND IF NOTHING SEARCHED!!");
  }
  res.send(`<h1>Search results for: ${q}</h1>`);
});
// localhost:3000/search?q=cat&color=green
```

여러개의 쿼리 문자열을 처리할 땐 &을 사용한다.

## nodemon을 사용한 서버 재시작

서버에 변경 사항을 적용하려면 서버를 재시작해야 한다. 매번 재시작하기 번거롭기 때문에 nodemon 이라는 라이브러리를 사용한다. nodemon은 서버에 변경 사항이 생기고 저장을 하면 자동으로 서버를 재시작해준다.
npm i -g nodemon 명령으로 설치한다.
