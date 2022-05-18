# Section35 : RESTful라우트 정의하기

### (예제 : 35_RESTful)

## GET 요청과 POST 요청

GET 요청은 대부분 정보를 가져올 때 사용한다.

- Get 요청을 보낼 때 따라오는 데이터가 있다면 데이터는 쿼리 문자열에 담긴다.
- Get 요청으로 데이터를 보내면 검색을 하거나 분류 혹은 정렬을 하는 경우이다.

POST 요청은 정보를 올리거나 보낼 때 사용한다.

- Post요청은 데이터를 보낼 때 주로 사용한다.
- 쿼리 문자열은 요청의 일부를 포함하지 않는다. 대신 요청의 Body에 포함된다.
- 쿼리 문자열 대신 JSON 타입으로도 보낼 수 있고 텍스트로 취급한다.
- 입력한 데이터는 쿼리 문자열로 들어가지 않고 요청의 페이로드 역할을 한다.

## 요청 구문 분석하기

request body에서 데이터를 추출하거나 조작하는 법을 알아보자.  
데이터가 폼이나 Postman을 통해 전송될 때 request body 및 Express에 들어갈 수 있는 데이터를 갖는다.  
이때 데이터에 접근할 수 있는 방법이 있다. 쿼리 문자열 데이터가 있는 것어럼 자동 분석되고 req.query에 포함된다. 이것은 들어오는 HTTP 요청을 기반을 한 객체이다.  
req.body로 전송되는 데이터는 포맷이 다양하고 실제 전송 방식과 암호화 방식이 다르다. 그래서 암호화된 폼 정보를 분석해야 한다.  
전송된 데이터를 조작하려면 req.body를 분해 해야 한다.

```js
// example
const { meat, qty } = req.body;
```

## REST 개요

### REST란

Representational State Transfer의 약자이다. 자원을 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미한다.

### 자원(resource)의 표현(representation)에 의한 상태 전달

- 자원(resouce)의 표현(representation)
  - 자원: 해당 소프트웨어가 관리하는 모든 것
  - ex. 문서, 그림, 데이터, 해당 소프트웨어 자체 등
  - 자원의 표현: 그 자원을 표현하기 위한 이름
  - ex. DB의 학생 정보가 자원일 때, 'students'를 자원의 표현으로 정한다.
- 상태(정보) 전달
  - 데이터가 요청되어지는 시점에서 자원의 상태(정보)를 전달한다.
  - JSON 혹은 XML를 통해 데이터를 주고 받는 것이 일반적이다.
- 월드 와이드 웹(www)과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 개발 아키텍처의 형식
  - REST는 기본적으로 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용하기 때문에 웹의 장점을 최대한 활용할 수 있는 아키텍처 스타일이다.
  - REST는 네트워크 상에서 Clientdhk Server 사이의 통신 방식 중 하나이다.

### REST의 구체적인 개념

HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.  
즉, REST는 자원 기반의 구조(ROA, Resource Oriented Architecture) 설계의 중심에 Resource가 있고 HTTP Method를 통해 Resource를 처리하도록 설계된 아키텍처를 의미한다,  
웹 사이트의 이미지, 텍스트, DB 내용 등의 모든 자원에 고유한 ID인 HTTP URI를 부여한다.

- CRUD Operation
  - Create: 생성(POST)
  - Read: 조회(GET)
  - Update: 수정(PUT)
  - Delete: 삭제(DELETE)
  - HEAD: header 정보 조회(HEAD)

### REST의 장단점

- 장점
  - HTTP 프로토콜의 인프라를 그대로 사용하므로 REST API 사용을 위한 별도의 인프라를 구축할 필요가 없다.
  - HTTP 프로토콜의 표준을 최대한 활용하여 여러 추가적인 장점을 함께 가져갈 수 있게 해준다.
  - HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.
  - Hypermedia API의 기본을 충실히 지키면서 범용성을 보장한다.
  - REST API 메시지가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있다.
  - 여러가지 서비스 디자인에서 생길 수 있는 문제를 최소화한다.
  - 서버와 클라이언트의 역할을 명확하게 분리한다.
- 단점
  - 표준이 존재하지 않는다.
  - 사용할 수 있는 메소드가 4가지 밖에 없다. (HTTP Method 형태가 제한적이다.)
  - 브라우저를 통해 테스트할 일이 많은 서비스라면 쉽게 고칠 수 있는 URL보다 Header 값이 왠지 더 어렵게 느껴진다.
  - 구형 브라우저가 아직 제대로 지원해주지 못하는 부분이 존재한다.  
    (PUT, DELETE를 사용하지 못하는 점, pushState를 지원하지 않는 점)

### REST가 필요한 이유

- 애플리케이션 분리 및 통합
- 다양한 클라이언트의 등장
- 최근의 서버 프로그램은 다양한 브라우저와 안드로이드폰, 아이폰과 같은 모바일 디바이스에서도 통신을 할 수 있어야 한다.
- 이러한 멀티 플랫폼에 대한 지원을 위해 서비스 자원에 대한 아키텍처를 세우고 이용하는 방법을 모색한 결과, REST에 관심을 가지게 되었다.

### REST 구성 요소

1. 자원(Resource): URI

- 모든 자원에 고유한 ID가 존재하고, 이 자원은 Server에 존재한다.
- 자원을 구별하는 ID는 '/groups/:group_id'와 같은 HTTP URI다.
- Client는 URI를 이용해서 자원을 지정하고 해당 자원의 상태(정보)에 대한 조작을 Server에 요청한다.

2. 행위(Verb): HTTP Method

- HTTP 프로토콜의 Method를 사용한다.
- HTTP 프로토콜은 GET, POST, PUT, DELETE와 같은 메서드를 제공한다.

3. 표현(Representation of Resource)

- Client가 자원의 상태(정보)에 대한 조작을 요청하면 Server는 이에 적절한 응답(Representation)을 보낸다.
- REST에서 하나의 자원은 JSON, XML, TEXT, RSS 등 여러 형태의 Representation으로 나타내어 질 수 있다.
- JSON 혹은 XML를 통해 데이터를 주고 받는 것이 일반적이다.

### REST 특징

1. Server-Client(서버-클라이언트 구조)

- 자원이 있는 쪽이 Server, 자원을 요청하는 쪽이 Client 가 된다.
  - REST Server: API를 제공하고 비즈니스 로직 처리 및 저장을 책임진다.
  - Client: 사용자 인증이나 context(세션, 로그인 정보) 등을 직접 관리하고 책임진다.
- 서로 간 의존성이 줄어든다.

2. Stateless(무상태)

- HTTP 프로토콜은 Stateless Protocol이므로 REST 역시 무상태성을 갖는다.
- Client의 context를 Server에 저장하지 않는다.
  - 즉, 세션과 쿠키와 같은 context 정보를 신경쓰지 않아도 되므로 구현이 단순해진다.
- Server는 각각의 요청을 완전히 별개의 것으로 인식하고 처리한다.
  - 각 API 서버는 Client의 요청만을 단순 처리한다.  
    즉, 이전 요청이 다음 요청의 처리에 연관되어서는 안된다.  
    물론 이전 요청이 DB를 수정하여 DB에 의해 바뀌는 것은 허용한다.
  - Server의 처리 방식에 일관성을 부여하고 부담이 줄어들며, 서비스의 자유도가 높아진다.

3. Cacheable(캐시 처리 가능)

- 웹 표준 HTTP 프로토콜을 그대로 사용하므로 웹에서 사용하는 기존의 인프라를 그대로 활용할 수 있다.
  - 즉, HTTP가 가진 가장 강력한 특징 중 하나인 캐싱 기능을 적용할 수 있다.
  - HTTP 프로토콜 표준에서 사용하는 Last-Modified 태그나 E-Tag를 이용하면 캐싱 구현이 가능하다.
  - 대량의 요청을 효율적으로 처리하기 위해 캐시가 요구된다.
  - 캐시 사용응ㄹ 통해 응답시간이 빨라지고 REST Server 트랜잭션이 발생하지 않기 때문에 전체 응답시간, 성능, 서버의 자원 이용률을 향상시킬 수 있다.

4. Layered System(계층화)

- Client는 REST API Server만 호출한다.
- REST Server는 다중 게층으로 구성될 수 있다.
  - API Server는 순수 비즈니스 로직을 수행하고 그 앞단에 보안, 로드밸런싱, 암호화, 사용자 인증 등을 추가하여 구조상의 유연성을 줄 수 있다.
  - 또한, 로드밸런싱, 공유 캐시 등을 통해 확장성과 보안성을 향상시킬 수 있다.

5. Code-On-Demand(optional)

- Server로부터 스크립트를 받아서 Client에서 실행한다.
- 반드시 충족할 필요는 없다.

6. Uniform Interface(인터페이스 일관성)

- URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행한다.
- HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.
  - 특정 언어나 기술에 종속되지 않는다.

## RESTful

### RESTful이란

RESTful은 일반적으로 REST라는 아키텍처를 구현하는 웹 서비스를 나타내기 위해 사용되는 용어이다.

- REST API를 제공하는 웹 서비스를 RESTful하다고 할 수 있다.

RESTful은 REST를 REST답게 쓰기 위한 방법으로, 누군가가 공식적으로 발표한 것이 아니다. 즉, REST 원리를 따르는 시스템은 RESTful이란 용어로 지칭된다.

### RESTful의 목적

- 이해하기 쉽고 사용하기 쉬운 REST API를 만드는 것
- RESTful한 API를 구현하는 근본적인 목적이 성능 향상에 있는 것이 아니라 일관적인 컨벤션을 통한 API의 이해도 및 호환성을 높이는 것이 주 동기이니, 성능이 중요한 상황에서는 굳이 RESTful한 API를 구현할 필요는 없다.

### RESTful하지 못한 경우

- CRUD 기능을 모두 POST로만 처리하는 API
- route에 resource, id 외의 정보가 들어가는 경우(/students/updateName)

## RESTful 서버 아키텍처 구현

주의할 점은 RESTful의 방식으로 앱을 구조화하는 방법은 여러가지가 있다.  
한 가지 방법을 사용하는 것은 그저 하나의 옵션을 사용하는 것이다.  
EJS도 포함해서 HTML을 제공하는 RESTful 앱을 만들 것이고 사용자가 양식과 상호작용하며 새 댓글을 작성하거나 댓글을 편집할 수 있게 만들 것이다.

### 기본 CURD 기능의 청사진

```js
GET /comments - list all comments
// 모든 댓글 조회
POST /comments - Create a new comment
// 새로운 댓글 작성
GET /comments/:id - Get one comment (using ID)
// ID를 사용하여 한 개의 댓글 조회
PATCH /comments/:id - Update one comment
// id로 조회한 한 개의 댓글 수정
DELETE /comments/:id - Destroy one comment
// id로 조회한 한 개의 댓글 삭제
```

## res.redirect()

post 요청 시, 리다이렉션을 하지 않고 무언가를 출력하게 되면 get으로 페이지를 요청한 곳으로 돌아가지 않고, 출력한 것만 페이지에 뜨게 된다.  
ex. get(/comments/new)로 댓글 입력창을 렌더링 하고 정보를 입력한 후 post요청으로 정보를 보냈을 때, post요청의 코드에 res.render('IT WORKED!!') 코드가 있을 경우, 화면에 IT WORKED!! 가 출력되고, /comments 화면으로 넘어가지 않는다. 이럴 경우 res.render()로 출력하지 않고, res.redirect() 메서드를 사용해서 get요청인 /comments로 넘어갈 수 있다.  
redirect([status], path) : 웹페이지 경로를 강제로 이동시키는 메소드이다.  
첫 번째 인수는 기본값으로 웹 코드넘버인 302를 갖는다. 웹 코드넘버가 302인 경우 두 번째 인수에 있는 경로로 강제로 이동시키는 것이다.

## Slug

Slug는 사람이 읽을 수 있는 고유 식별자로, ID와 같이 사람이 읽기 어려운 식별자 대신 리소스를 식별하는 데 사용된다. 항목을 한 눈에 볼 수 있는 기능을 유지하면서 항목을 참조하려는 경우 슬러그를 사용한다.

## uuid 라이브러리

Universally Unique IDentifier의 약자로, 전세계에 하나밖에 없는 ID라는 뜻이다. 이런 ID는 고유하기 때문에 서버에서 사용자들에 UUID를 붙여서 구분하는 등 여러 방면에서 유용하게 쓰일 수 있다.

## PUT 과 PATCH 의 창

두 가지 요청 모두 수정에 관련된 요청이지만, PUT 요청은 전부를 수정하는 요청이고, PATCH는 부분적으로 수정할 수 있는 요청이다.

## Method-Override

Express docs는 method-override라는 패키지로 연결해주는데 그 역할은 브라우저 폼처럼 클라이언트가 해당 작업을 지원하지 않는 환경에서 Put, Delete 등의 HTTP 동사를 쓰도록 해준다.  
여러 가지 사용 방법이 있지만, 우리가 사용하는 방법은 쿼리 값을 이용하는 방법이다.  
또 다른 옵션은 HTTP 헤더를 요청에 전달해서 이걸 삭제해야 한다고 지정을 해 주는 것이다. Post요청이긴 하지만 헤더에 '이 요청은 Delete나 Patch, Put 요청으로 취급해' 라고 말할 수 있다. 그럼 Express에서 Delete 라우트와 매칭이 된다.

```js
// Example call with query override using HTML <form>:
<form method="POST" action="/resource?_method=DELETE">
  <button type="submit">Delete resource</button>
</form>
// Post 요청이지만, Express는 Delete 요청으로 취급한다.
```
