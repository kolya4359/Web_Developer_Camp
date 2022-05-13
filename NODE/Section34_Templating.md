# Section34 : 템플레이팅으로 동적 HTML 구성하기

## 템플레이팅이란?

템플릿 엔진(Templete Engine)은 PHP나 JSP처럼 동적인 결과를 정적인 파일(HTML)에 담기 위해 사용한다. 즉, 서버 코드인 JavaScript로 연산된 결과를 변수에 넣고 변수를 뷰(view) 파일에서도 사용할 수 있도록 도와준다. 따라서 서버파일(app.js) 내에 HTML 코드를 쓰지 않아도 되므로 뷰와 서버 코드를 따로따로 관리할 수 있게 해준다. 이러한 템플릿 엔진의 종류에는 pug(구 jade)와 ejs가 있다.

```js
// index.js
const express = require("express");
const app = express();
const path = require("path");
// 내장된 노드의인 path라는 모듈은 파일과 디렉토리 경로에 관한 메서드를 제공한다.

app.set("view engine", "ejs");
// ejs 라는 라이브러리를 템플릿 엔진으로 사용하기 위한 설정
app.set("views", path.join(__dirname, "/views"));
// path.join 메서드는 여러 경로 세그먼트를 합쳐서 일반화하여 결국 하나의 경로로 만든다.
// views 디렉토리의 index.js 파일을 뷰 엔진의 경로로 설정해서 뷰 디렉토리 외부에서 서버를 실행해도 views 디렉토리의 index.js 파일을 실행한다.
// __ 혹은 dunder 뒤에 오는 dirname 혹은 디렉토리 이름은 index.js 혹은 어떤 파일이 있는 디렉토리 이름을 말한다.

app.get("/", (req, res) => {
  res.render("home");
});
// '/' 으로 get요청을 받으면 home.ejs 파일을 렌더링한다.
// 뷰 엔진이 ejs이므로 home 뒤에 확장자 .ejs를 안 써도 자동으로 찾아준다.

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
```

## EJS 구문

- <%= %>
  - 태그 안의 값은 템플릿으로 출력된다.
  - ex. <%= 4 + 5 + 1 %> : 10으로 출력된다.  
    템플릿 리터럴처럼 사용되고, `이나 ${} 대신 사용한다.
  - <%= 'hello world'.toUpperCase() %> : hello world가 대문자로 출력된다.

### 템플릿에 데이터 전달하기

```js
// index.js
...
app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { rand: num })
  // res.render('random', { num })
  // render의 두 번째 인자로 데이터를 넘길 수 있다. 키와 값의 이름을 같게 하면 한번만 작성해도 된다.
})

app.listen(3000, () => {
...
```

```html
<!-- random.ejs -->
<body>
  <h1>Your random number is: <%= rand %></h1>
  <!-- rand라는 키를 이용해서 데이터값을 출력한다. -->
</body>
```

### 서브레딧 템플릿 데모

```js
// index.js
...
// 경로, 변수에서 정보를 전달한다.
app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  res.render('subreddit', { subreddit });
})
app.listen(3000, () => {
...
```

```html
<!-- subreddit.ejs -->
<head>
  <title><%= subreddit %></title>
</head>
<body>
  <h1>Browsing The <%= subreddit %> subreddit</h1>
</body>
```

### EJS의 조건문

```js
// index.js
...
app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { num })
})

app.listen(3000, () => {
...
```

```html
<!-- random.ejs -->
<body>
  <h1>Your random number is: <%= num %></h1>
  <% if(num % 2 === 0) { %>
  <h2>That is an even number!</h2>
  <% } else { %>
  <h2>That is an odd number!</h2>
  <% } %>
  <h3>That number is : <%= num%2===0 ? 'EVEN' : 'ODD' %></h3>
</body>
```

<% %> 구문을 사용하면 로직을 작성할 수 있다.  
<%= %> 구문과 다른 점은 <%= %> 구문은 페이지에 렌더링 되지만, <% %>구문은 페이지에 렌더링 되지 않고 로직이 참일 경우에만 \<h2>That is an even number!\</h2> 부분을 렌더링한다.
<% %> 구문은 기본적으로는 그 자리에 있으면서 템플릿의 흐름을 제어하고 로직을 더할 뿐 뭔가를 직접 렌더링하지는 않는다.

### EJS의 루프

```js
// index.js
...
app.get('/cats', (req, res) => {
  const cats = [
    'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
  ] // 데이터베이스 대용으로 배열을 만들었다.
  res.render('cats', { cats })
})
```

```html
<!-- cats.ejs -->
<body>
  <h1>All The Cats</h1>
  <ul>
    <% for(let cat of cats) { %>
    <li><%= cat %></li>
    <% } %>
  </ul>
</body>
```

### 복잡한 서브레딧 데모 더 알아보기

```js
// index.js
...
const redditDate = require('./data.json')
...
app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if(data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('notfound', { subreddit })
  }
})
```

```html
<!-- subreddit.ejs -->
<head>
  <title><%= name %></title>
</head>
<body>
  <h1>Browsing The <%= name %> subreddit</h1>
  <h2><%= description %></h2>
  <p><%= subscribers %> Total Subscribers</p>
  <hr />

  <% for(let post of posts) { %>
  <article>
    <p><%= post.title %> - <b><%= post.author %></b></p>
    <% if(post.img) { %>
    <img src="<%= post.img %>" alt="" />
    <% } %>
  </article>
  <% } %>
</body>
```

```json
// data.json
{
  "soccer": {
    "name": "Soccer",
    "subscribers": 800000,
    "description": "The football subreddit. News, results and discussion about the beautiful game.",
    "posts": [
      {
        "title": "Marten de Roon to make pizza for more than 1,000 people in Bergamo if Atalanta win the Champions league.",
        "author": "joeextreme"
      },
      {
        "title": "Stephan Lichtsteiner has retired from professional football",
        "author": "odd person"
      },
      {
        "title": "OFFICIAL: Dani Parejo signs for Villareal.",
        "author": "joeextreme"
      }
    ]
  },
  "chickens": {
    "name": "Chickens",
    "subscribers": 23956,
    "description": "A place to post your photos, video and questions about chickens!",
    "posts": [
      {
        "title": "Naughty chicken hid under a shed for 3 weeks and came home with 25 chicks today!",
        "author": "joeextreme",
        "img": "https://preview.redd.it/pcn8u4j7c9z61.jpg?width=960&crop=smart&auto=webp&s=e114976dde1108b9556555d2db36a3cb6211798d"
      },
      {
        "title": "Had to kill my first chicken today. Does it get any easier?",
        "author": "sad boi"
      },
      {
        "title": "My five year old chicken set and hatched one baby. I guess she wanted to be a mama one more time.",
        "author": "tammythetiger",
        "img": "https://preview.redd.it/lervkuis3me51.jpg?width=640&crop=smart&auto=webp&s=6a18ab3c4daa80eccf3449217589b922fa443946"
      }
    ]
  },
  "mightyharvest": {
    "name": "Mighty Harvest",
    "subscribers": 44002,
    "description": "Feeding many villages and village idiots for 10s of days.",
    "posts": [
      {
        "title": "My first meyer lemon ripened today. Im so proud of the little guy. Banana for scale",
        "author": "proudmamma",
        "img": "https://preview.redd.it/1bz6we4j54941.jpg?width=640&crop=smart&auto=webp&s=a036ea99299f7737efde9f6c3bfa43893f5eaa00"
      },
      {
        "title": "I think I overestimated the harvest basket size I needed.",
        "author": "grower123",
        "img": "https://preview.redd.it/4h99osd25i351.jpg?width=640&crop=smart&auto=webp&s=d651250a345bbceeba7a66632e8c52a02d71bc73"
      }
    ]
  }
}
```

## Express의 정적 Assets 사용하기

이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용해야 한다.  
정적 자산이 포함된 디렉토리의 이름을 express.static미들웨어 함수에 전달하면 파일의 직접적인 제공을 시작할 수 있다. 예를 들면, 다음과 같은 코드를 이용하여 public이라는 이름의 디렉토리에 포함된 이미지, CSS 파일 및 JavaScript 파일을 제공한다.

```js
app.use(express.static("public"));
```

이제 다음과 같이 public 디렉토리에 포함된 파일을 로드할 수 있다.

```js
http.localhost:3000/images/kitten.jpg
http.localhost:3000/css/style.css
http.localhost:3000/js/app.js
http.localhost:3000/images/bg.png
http.localhost:3000/hello.html
```

> Express는 정적 디렉토리에 대해 상대적으로 파일을 검색하며, 따라서 정적 디렉토리의 이름은 URL의 일부가 아니다.

여러개의 정적 자산 디렉토리를 이용하려면 다음과 같이 express.static 미들웨어 함수를 여러 번 호출하면 된다.

```js
app.use(express.static("public"));
app.use(express.static("files"));
```

Express는 express.static 미들웨어 함수를 이용해 정적 디렉토리를 설정한 순서대로 파일을 검색한다.  
express.static 함수를 통해 제공되는 파일에 대한 가상 경로 접두부(파일 시스템 내에 해당 경로가 실제로 존재하지 않는 경우)를 작성하려면, 아래에 표시된 것과 같이 정적 디렉토리에 대한 마운트 경로를 지정하면 된다.

```js
app.use("/static", express.static("public"));
```

이제 /static 경로 접두부를 통해 public 디렉토리에 포함된 파일을 로드할 수 있다.

```js
http.localhost:3000/static/images/kitten.jpg
http.localhost:3000/static/css/style.css
http.localhost:3000/static/js/app.js
http.localhost:3000/static/images/bg.png
http.localhost:3000/static/hello.html
```

그러나 express.static함수에 제공되는 경로는 node 프로세스가 실행되는 디렉토리에 대해 상대적이다. Express 앱을 다른 디렉토리에서 실행하는 경우에는 다음과 같이 제공하기 원하는 디렉토리의 절대 경로를 사용하는 것이 더 안전하다.

```js
app.use("/static", express.static(__dirname + "/public"));
```

## 부트스트랩과 Express

부트스트랩 홈페이지에서 부트스트랩을 다운 받고, jQuery 홈페이지에서 jQuery 파일도 다운 받아서 사용할 파일 \<head> 에 적용해준다.

```html
<!-- head.ejs -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Site</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css" />
  <script src="/js/jquery.js"></script>
  <script src="/js/bootstrap.min.js"></script>
</head>
```

## EJS와 파일 분할

페이지마다 반복적으로 사용해야 하는 기능들(header, footer)을 일일이 작성해주면 번거롭고 코드가 복잡해진다. 이럴 때 공통된 기능들을 파일로 만들고 그 파일을 가져다 사용해서 코드를 간략하게 줄일 수 있다.

<%- %> 사이에 적용할 파일의 경로를 작성하면 페이지에 구현된다.

```html
<!-- head.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Site</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css" />
    <script src="/js/jquery.js"></script>
    <script src="/js/bootstrap.min.js"></script>
  </head>

  <body></body>
</html>
```

```html
<!-- home.ejs -->
<%- include('partials/head')%>
<!-- head 파일을 불러온다. -->

<%- include('partials/navbar')%>

<h1>The Home Page <%= 'hello world'.toUpperCase() %></h1>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nulla vero
  expedita eius a? Possimus nam, inventore perferendis laudantium culpa pariatur
  corrupti maxime dignissimos consectetur adipisci. Eligendi esse possimus
  consequatur.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Tempore temporibus fugiat, aliquam officiis eius dolorum maiores maxime
  doloremque? Excepturi libero perferendis eum neque natus corrupti quos
  pariatur necessitatibus vitae. Officiis.
</p>

<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore maxime,
  cupiditate obcaecati officiis, ipsam nam exercitationem provident repellat
  quas qui delectus quibusdam dolores quo distinctio temporibus fugit
  repellendus? Animi, atque.
</p>

<%- include('partials/footer')%>
```
