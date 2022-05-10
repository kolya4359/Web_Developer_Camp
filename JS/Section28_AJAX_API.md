# Section28 : AJAX와 API

## AJAX 개요

AJAX란 비동기 자바스크립트와 XML (Asynchronous JavaScript And XML)을 말한다. 서버와 통신하기 위해 XMLHttpRequest 객체를 사용하는 것을 말한다.  
JSON, XML, HTML 그리고 일반 텍스트 형식 등을 포함한 다양한 포맷을 주고 받을 수 있다. AJAX의 강력한 특징은 페이지 전체를 새로고침 하지 않고서도 수행 되는 "비동기성"이다. 이러한 비동기성을 통해 사용자의 Event가 있으면 전체 페이지가 아닌 일부분만을 업데이트 할 수 있게 해준다.

AJAX의 주요 두가지 특징은 아래의 작업을 할 수 있게 해준다.

- 페이지 새로고침 없이 서버에 요청
- 서버로부터 데이터를 받고 작업을 수행

## APIs 개요

API는 정의 및 프로토콜 집합을 사용하여 두 소프트웨어 구성 요소가 서로 통신 할 수 있게 하는 메커니즘이다. 예를 들어, 기상청의 소프트웨어 시스템에는 일일 기상 데이터가 들어 있다. 휴대폰의 날씨 앱은 API를 통해 이 시스템과 "대화"하고 휴대폰에 매일 최신 날씨 정보를 표시한다.

API는 Application Programming Interface(애플리케이션 프로그램 인터페이스)의 줄임말이다. API의 맥락에서 애플리케이션이라는 단어는 고유한 기능을 가진 모든 소프트웨어를 나타낸다. 인터페이스는 두 애플리케이션 간의 서비스 계약이라고 할 수 있다. 이 계약은 요청과 응답을 사용하여 두 애플리케이션이 서로 통신하는 방법을 정의한다.

API 아키텍처는 일반적으로 클라이엍느와 서버 측면에서 설명된다. 요청을 보내는 애플리케이션을 클라이언트라고 하고 응답을 보내는 애플리케이션을 서버라고 한다. 따라서 날씨 예에서 기상청의 날씨 데이터베이스는 서버이고 모바일 앱은 클라이언트이다.

## JSON

JSON (JavaScript Object Notation)은 속성-값 쌍, 배열 자료형 또는 기타 모든 시리얼화 가능한 값 또는 "키-값 쌍"으로 이루어진 데이터 오브젝트를 전달하기 위해 인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷이다. 비동기 브라우저/서버 통신(AJAX)을 위해, 넓게는 XML을 대체하는 주요 데이터 포맷이다. 특히, 인터넷에서 자료를 주고 받을 때 그 자료를 표현하는 방법으로 알려져 있다. 자료의 종류에 큰 제한이 없으며, 특히 컴퓨터 프로그램의 변수값을 표현하는 데 적합하다.  
본래는 자바스크립트 언어로부터 파생되어 자바스크립트의 구문 형식을 따르지만 언어 독립형 데이터 포맷이다. 즉, 프로그래밍 언어나 플랫폼에 독립적이므로, 구문 분석 및 JSON 데이터 생성을 위한 코드는 수만흥ㄴ 프로그래밍 언어에서 쉽게 이용할 수 있다.

### Static Methods

- JSON.parse(text[, reviver])
  - JSON을 JavaScript문법으로 바꿔준다.
- JSON.stringify(value[, replacer[, space]])
  - JavaScript문법을 JSON으로 바꿔준다.

## XML

XML은 EXtensible Markup Language의 약자이다.  
HTML과 매우 비슷한 문자 기반의 마크업 언어(text-based markup language)이다. 이 언어는 사람과 기계가 동시에 읽기 편한 구조로 되어 있다.  
그러나 XML은 HTML처럼 데이터를 보여주는 목적이 아닌, 데이터를 저장하고 전달할 목적으로 만들어졌다.  
또한, XML 태그는 HTML 태그처럼 미리 정의되어 있지 않고, 사용자가 직접 정의할 수 있다.

### XML의 특정

1. XML은 다른 목적의 마크업 언어를 만드는 데 사용되는 다목적 마크업 언어이다.
2. XML은 다른 시스템끼리 다양한 종류의 데이터를 손쉽게 교환할 수 있도록 해준다.
3. XML은 새로운 태그를 만들어 추가해도 계속해서 동작하므로, 확장성이 좋다.
4. XML은 데이터를 보여주지 않고, 데이터를 전달하고 저장하는 것만을 목적으로 한다.
5. XML은 텍스트 데이터 형식의 언어로 모든 XML 문서는 유니코드 문자로만 이루어진다.

## Postman 사용하기

이미 만든 API를 테스트하거나 만들지 않았더라도 작동 원리를 확인하기 위해 테스트 할 수도 있다. API 작업을 할 때 테스트를 하고 원하는 대로 작동하는지 확인한 후에 요청을 보내는 코드를 작성하기 위한 무료 앱이 Postman이다.

### HTTP 상태 코드

- 1xx(정보) : 요청을 받았으며 프로세스를 계속 진행한다.
- 2xx(성공) : 요청을 성공적으로 받았으며 인식했고 수용하였다.
- 3xx(리다이렉션) : 요청 완료를 위해 추가 작업 조치가 필요하다.
- 4xx(클라이언트 오류) : 요청의 문법이 잘못되었거나 요청을 처리할 수 없다.
- 5xx(서버 오류) : 서버가 명백히 유효한 요청에 대한 충족을 실패했다.

## XHR (XmlHttpRequest) 객체 만들기

XHR은 초기 요청 방식이고 Fetch와 같은 최신 방식도 있다.  
XHR은 Promise를 지원하지 않아서 콜백 함수를 사용해야 한다.

```js
const myReq = new XMLHttpRequest();

myReq.onload = function () {
  const data = JSON.parse(this.responseText);
  console.log(data);
};
myReq.onerror = function (err) {
  console.log("ERROR!", err);
};
myReq.open("get", "https://icanhazdadjoke.com/", true);
myReq.setRequestHeader("Accept", " application/json");
myReq.send();
```

## Fetch API

HTTP 파이프라인을 구성하는 요청과 응답 등의 요소를 JavaScript에서 접근하고 조작할 수 있는 인터페이스를 제공한다. Fetch API가 제공하는 전역 fetch()메서드로 네트워크의 리소스를 쉽게 비동기적으로 가져올 수 있다.  
이전에는 이런 기능을 XHR을 사용해 할 수 있었다. Fetch는 더 좋은 대체제면서, 서비스 워커 등 다른 기술에서도 쉽게 사용할 수 있는 API이다. 또한 CORS와 같이 HTTP와 관련된 다른 개념들을 한 곳에 모아서 정의할 수 있는 논리적인 장소도 제공한다.

```js
fetch("https://api.cryptonator.com/api/ticker/btc-usd")
  .then((res) => {
    console.log("RESPONSE, WAITING TO PARSE...", res);
    return res.json();
  }) // fetch로 데이터를 받으면 우리가 원하는 콘텐츠인 body가 없다. 이 부분이 fetch의 단점이다. 그래서 json() 메서드를 이용해서 원하는 콘텐츠를 받아온다.
  // json()은 비동기 함수이기 때문에 Promise를 반환한다. 그래서 then을 사용할 수 있다.
  .then((data) => {
    console.log("DATA PARSED...");
    console.log(data.ticker.price);
  })
  .catch((e) => {
    console.log("OH NO! ERROR!", e);
  });

// 위와 같은 코드를 비동기 함수로 똑같이 만든 예제
const fetchBitcoinPrice = async () => {
  try {
    const res = await fetch("https://api.cryptonator.com/api/ticker/btc-usd");
    const data = await res.json();
    console.log(data.ticker.price);
  } catch (e) {
    console.log("SOMETHING WENT WRONG!!!", e);
  }
};
```

## Axios 개요

Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP비동기 통신 라이브러리이다.

### Axios vs Fetch

| axios                                            | fetch                                                            |
| :----------------------------------------------- | :--------------------------------------------------------------- |
| 요청 객체에 url이 있다.                          | 요청 객체에 url이 없다.                                          |
| 써드파티 라이브러리로 설치가 필요                | 현대 브라우저에 빌트인이라 설치 필요 없음                        |
| XSRF 보호를 해준다.                              | 별도 보호 없음                                                   |
| data 속성을 사용                                 | body 속성을 사용                                                 |
| data는 object를 포함한다.                        | body는 문자열화 되어있다.                                        |
| status가 200이고 statusText가 'OK'이면 성공이다. | 응답객체가 ok 속성을 포함하면 성공이다.                          |
| 자동으로 JSON 데이터 형식으로 변환된다.          | .json()메서드를 사용해야 한다.                                   |
| 요청을 취소할 수 있고 타임아웃을 걸 수 있다.     | 해당 기능 존재 하지 않음.                                        |
| HTTP 요청을 가로챌 수 있음.                      | 기본적으로 제공하지 않음.                                        |
| download진행에 대해 기본적인 지원을 함.          | 지원하지 않음.                                                   |
| 좀더 많은 브라우저에 지원됨                      | Chrome 42+, Firefox 39+, Edge 14+, and Safari 10.1+ 이상에 지원. |

```js
// fetch를 사용한 예제를 axios를 사용한 예제
const fetchBitcoinPrice = async () => {
  try {
    const res = await axios.get(
      "https://api.cryptonator.com/api/ticker/btc-usd"
    );
    console.log(res.data.ticker.price);
  } catch (e) {
    console.log("ERROR!", e);
  }
};
```

### axios로 헤더 세팅하기

```html
<body>
  <h1>Click to get new jokes!</h1>
  <button>Click me!</button>
  <ul id="jokes"></ul>

  <script src="app.js"></script>
</body>
```

```js
// app.js
const jokes = document.querySelector("#jokes");
const button = document.querySelector("button");

const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  const newLi = document.createElement("li");
  newLi.append(jokeText);
  jokes.append(newLi);
};
const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    return res.data.joke;
  } catch (e) {
    return "NO JOKES AVAILABLE! SORRY :(";
  }
};

button.addEventListener("click", addNewJoke);
// axios의 두번째 인자로 헤더 요청 설정을 넘겨준다. 이 헤더 요청 설정에서 json으로 받는다고 설정한다. 그럼 JavaScript 객체로 파싱된 JSON이 넘어오고 그 안에 있는 joke 값에 접근할 수 있다.
// li태그를 만들고 joke값을 넣어준 후 ul 태그에 넣어준다. 이렇게 요청으로 받은 데이터를 DOM에 사용할 수 있다.
```

## TV 프로그램 검색 앱

```html
<body>
  <h1>TV Show Search</h1>
  <form id="searchForm">
    <input type="text" placeholder="TV Show Title" name="query" />
    <button>Search</button>
  </form>
  <script src="app.js"></script>
</body>
```

```js
// app.js
const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
  e.preventDefalut();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm, isFunny: 'colt' } }
  const res = await axios.get(
    `http://api.tvmaze.com/search/shows`, config);
  );
  makeImages(res.data);
  form.elements.query.value = '';
});

const makeImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium;
      document.body.append(img);
    }
  }
};
```
