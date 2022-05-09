# 잃어버린 퍼즐 한 조각: DOM 이벤트

## 이벤트 개요

일반적으로 프로그래밍 언어에서 이벤트라고 하면 사용자의 동작 혹은 프로그램에서 발생하는 특정한 상황을 의미한다 . 이벤트가 발생하면 보통 사전에 정의된 특정 코드가 실행되고 그에 따라 기능이 동작하거나 화면이 변경되는 등의 변화가 발생한다.

- 웹 브라우저가 알려주는 HTML요소에 대한 **사건의 발생** 을 의미
- 자바스크립트는 이벤트에 반응하여 **특정 동작** 을 수행할 수 있음
- 입력양식으로부터 사용자의 입력값을 가져올 수 있음
- HTML이벤트속성은 자바스크립트 구문을 직접 실행하거나 함수를 호출할 수 있음

## 인라인 이벤트

태그 안에 직접 이벤트 속성을 넣는 방식이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document</title>
    <script>
      function h2clikk(e) {
        alert("클릭");
        alert("클릭");
        alert("클릭");
      }
    </script>
  </head>
  <body>
    <h1 onclick="alert('클릭');alert('클릭');alert('클릭');">Click Here</h1>
    <h2 onclick="h2click(event)">Click Here</h2>
  </body>
</html>
```

### onClick 이벤트

이번에는 인라인 방식이 아닌 다른 방식으로 이벤트를 적용한다.

```html
<body>
  <h1>Events</h1>
  <button id="v2">Click Here!</button>

  <script src="app.js"></script>
</body>
```

```js
// app.js
const btn = document.querySelector("#v2");

btn.onclick = function () {
  console.log("YOU CLICKED ME!");
  console.log("I HOPE IT WORKED!!");
};

function scream() {
  console.log("AAAAHHHHH");
  console.log("STOP TOUCHING ME!");
}

btn.onmouseenter = scream;

// 이벤트를 button에만 사용할 수 있는 것이 아니라 h1 태그에도 사용할 수 있다.
document.querySelector("h1").onclick = function () {
  alert("you clicked the h1!");
};
// document.querySelector('h1').onclick = alert('...') 이런식으로 작성하면 안된다.
// 우리는 함수를 정의해서 이벤트 발생시 실행시키는 것이 목적인데 위와 같이 작성하면 즉시 실행이 되기 때문이다.
```

### addEventListener

addEventListener의 첫 번째 인자에는 이벤트가 들어가고, 두 번째 인자에는 해당 이벤트가 실제로 발생했을 때 실행하고 싶은 콜백함수가 들어간다.

```js
const button = document.querySelector("h1");

button.addEventListener("click", () => {
  alert("You clicked me!!");
});
```

```html
<button id="v3">Click Me</button>
```

```js
const btn3 = document.querySelector("#v3");
btn3.addEventListener("click", function () {
  alert("CLICKED!!");
});
```

### addEventListener를 사용하는 이유

```js
// 첫 번째 이유
function twist() {
  console.log("TWIST!");
}

function shout() {
  console.log("SHOUT!");
}

const tasButton = document.querySelector("#tas");

tasButton.onclick = twist;
tasButton.onclick = shout;
// shout!
// 이런 경우 마지막에 호출된 하나의 함수만 실행된다.

tasButton.addEventListener("click", twist);
tasButton.addEventListener("click", shout);
// twist!
// shout!

// 두 번째 이유
// addEventListener에 전달할 수 있는 많은 옵션들이 있다.
// MDN에서 확인할 수 있다.
tasButton.addEventListener("click", twist, { once: true });
tasButton.addEventListener("click", shout);
// { once: true } 로 설정하면 처음 한 번만 실행되고 그 다음부터 사라져서 shout만 실행된다.
```

## 랜덤 컬러 연습하기

html의 버튼을 누르면 배경색이 바뀌고 해당 색의 정보가 h1 문자열에 나타난다.

```html
<!-- index.html -->
<!DOCTYPE html>
<body>
  <h1>Welcome!</h1>
  <button>Click Me</button>

  <script src="app.js"></script>
  <body></body>
</body>
```

```js
// app.js
const button = document.querySelector("button");
const h1 = document.querySelector("h1");

button.addEventListener("click", function () {
  const newColor = makeRndColor();
  document.body.backgroundColor = newColor;
  h1.innerText = newColor;
});

const makeRnadColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
```

## 이벤트와 this라는 키워드

이벤트 프로퍼티를 이용한 이벤트 핸들러 함수 등록은 문서 요소 객체에 신규 메소드를 정의하는 과정과 유사하다.  
그러므로 이벤트 핸들러의 실행도 객체에 정의된 메소드 실행과 비슷할 수 밖에 없다. 즉, 이벤트 핸들러 안에서 this 키워드는 이벤트 타깃을 참조한다.

```js
const makeRandColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
const buttons = document.querySelectorAll("button");

for (let button of buttons) {
  button.addEventListener("click", colorize);
}

const h1s = document.querySelectorAll("h1");
for (let h1 of h1s) {
  h1.addEventListener("click", colorize);
}

function colorize() {
  this.style.backgroundColor = makeRandColor();
  this.style.color = makeRandColor();
}
// colorize 함수의 this는 해당 함수를 사용하는 실행부를 포함한 요소를 가리킨다.
```

## 키보드 이벤트와 이벤트 객체

DOM과 관련된 이벤트가 발생하면 관련 정보는 모두 evnet객체에 저장된다.  
이벤트 발생 요소, 이벤트 타입, 이벤트 관련 데이터도 저장된다.  
우리는 이벤트 객체의 정보를 참조하여 다양한 이벤트를 조작할 수 있다.  
(ex. 애니메이션, 하이라이트...)

키보드 이벤트를 사용하면 어떤 키를 눌렀는지 이벤트 객체의 event.key 속성과 event.code 속성의 값으로 표시된다. 이 값을 활용하여 여러 가지 동작을 실행할 수 있다.

## 폼 이벤트(Form Events)와 PreventDefault

preventDefault 메서드는 이벤트의 결과로서 일어날 기본 동작을 방지한다.  
다음 예제에서는 입력된 정보를 화면에 출력하는 예제이다.  
문제는 form 의 기본 동작이 submit을 실행하면 다음 페이지로 자동으로 넘어간다는 것이다. preventDefault()를 사용하면 새로고침을 막아주고 현재 페이지에 남아있게 해준다.

```html
<body>
  <h1>Form Events</h1>
  <form action="/dogs" id="tweetForm">
    <input type="text" name="username" placeholder="username" />
    <input type="text" name="tweet" placeholder="tweet" />
    <button>Post Tweet</button>
  </form>

  <h2>Tweets:</h2>
  <ul id="tweets"></ul>

  <script src="app.js"></script>
</body>
```

```js
// app.js
const tweetForm = document.querySelector("#tweetForm");
const tweetsContainer = document.querySelector("#tweets");
tweetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // preventDefault()를 처음에 실행시켜줘야 한다.

  const usernameInput = tweetForm.elements.username;
  const tweetInput = tweetForm.elements.tweet;
  addTweet(usernameInput.value, tweetInput.value);
  usernameInput.value = "";
  tweetInput.value = "";
});

const addTweet = (username, tweet) => {
  const newTweet = document.createElement("li");
  const bTag = document.createElement("b");
  bTag.append(username);
  // <b>username</b>
  newTweet.append(bTage);
  // <li><b>username</b></li>
  newTweet.append(`- ${tweet}`);
  // <li><b>username</b> - ${tweet}</li>
  tweetsContainer.append(newTweet);
  // <ul><li><b>username</b> - ${tweet}</li></ul>
};
```

## 입력과 변경 이벤트

변경 이벤트는 입력을 블러 아웃(blur out)할 때만 작동한다.
다음 예제는 input에 입력할 때마다 h1의 내용이 실시간으로 바뀌는 예제이다.

```js
const input = document.querySelector("input");
const h1 = document.querySelector("h1");

input.addEventListener("input", function (e) {
  h1.innerText = input.value;
});
```

## 이벤트 버블링

한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작한다. 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작한다.  
다음 예제는 button을 누르면 색이 변하는 이벤트와 div를 누르면 숨겨지는 이벤트가 겹쳐있다. 버튼을 눌렀을 때 색만 바뀌게 해야 한다.  
e.stopPropagation() 이라는 메서드를 사용하면 해당 함수가 실행의 마지막이 되도록 할 수 있다.

```html
<head>
  <style>
    .hide {
      display: none;
    }
  </style>
</head>
<body>
  <div id="container">
    Click To Hide
    <button>Change Color</button>
  </div>
  <script src="app.js"></script>
</body>
```

```js
// app.js
const button = document.querySelector("#changeColor");
const container = document.querySelector("#container");

button.addEventListener("click", function (e) {
  container.style.backgroundColor = makeRandColor();
  e.stopPropagation();
  // 이 메서드를 사용하면 다음 함수가 실행되지 않고 button.click에서 멈춘다.
});
container.addEventListener("click", function () {
  container.classLit.toggle("hide");
});

const makeRandColor = () => {
  const r = Math.floor(Math.randow() * 255);
  const g = Math.floor(Math.randow() * 255);
  const b = Math.floor(Math.randow() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
```

## 이벤트 위임 (Event Delegation)

하위 요소마다 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식을 말한다.  
다음 예제는 메뉴를 눌렀을 때 메뉴에 맞는 섹션으로 이동하는 스크롤 기능을 추가한다.  
부모 요소인 ul태그에 click 이벤트를 주고 li태그가 선택되었을 때 id 값을 통해 해당 위치로 이동하도록 한다.

```html
<nav class="nav">
  <ul class="nav__menus">
    <li class="nav__item">
      <a class="nav__menu" href="#menu1">menu1</a>
    </li>
    <li class="nav__item">
      <a class="nav__menu" href="#menu2">menu2</a>
    </li>
    <li class="nav__item">
      <a class="nav__menu" href="#menu3">menu3</a>
    </li>
    <li class="nav__item">
      <a>SignUp</a>
    </li>
  </ul>
</nav>

<section id="menu1">...</section>
<section id="menu2">...</section>
<section id="menu3">...</section>
```

```js
document.querySelector(".nav__menus").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__menu")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});
```
