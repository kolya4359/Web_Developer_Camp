# Section42: Express 앱의 오류 처리하기

## Express의 태생적 오류 처리기

몇 가지 오류의 유형이 있다.  
일단 개발자가 코드를 잘못 써서 일어나는 구문 오류가 있다.  
JavaScript가 수행할 수 없는 명령을 내리면 구문 오류나 뜬다.  
서버가 가동 중일 때 발생하는 오류도 있다.  
대개의 원인은 MongoDB 외 다양한 DB와 연결하거나 인터랙션할 때 또는 API, 외부 서비스, 라이브러리와 연결하거나 인터랙션할 때 발생한 불완전 데이터 때문이다.

```js
...
app.get('/error', (req, res) => {
  chicken.fly()
});
```

localhost:3000/error 경로로 이동하면 chicken은 정의되지 않았다는 오류가 뜬다. 이때 HTTP 상태 코드와 함께 Express에서 기본적으로 제공하는 오류 스택이 나온다.

```js
...
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === 'chickennugget') {
    next();
  }
  throw new Error('Password required!')
}

app.get('/secret', verifyPassword, (req, res) => {
  res.send('blahblahblah');
})
...
```

localhost:3000/secret 경로로 이동하면 'Password required!' 문구와 함께 오류 스택이 나온다. throw는 일부러 오류를 발생시키는 키워드이다.  
Express나 JavaScript는 오류가 뜨든 코드에서 오류가 발생하든 똑같이 취급한다.  
Express는 미들웨어나 라우트 콜백이나 라우트 핸들러에서 발견된 오류를 잡아내서 디폴트 핸들러로 처리한다.

## 사용자 지정 오류 처리기 정의하기

Express에서는 다른 미들웨어처럼 오류 처리 미들웨어 함수를 정의할 수 있지만, 이때 주의할 점이 있다.  
Express에서 오류 처리 함수를 만들 때 네 개의 인수를 전달해야 한다.  
(err, req, res, next) 이다.

```js
...
app.use((err, req, res, next) => {
  console.log(**********************************)
  console.log(**************ERROR***************)
  console.log(**********************************)
  res.status(500).send("OH BOY, WE GOT AN ERROR!!")
  // next()를 사용하지 않으면 위의 내용들만 출력되고 Express 내장 오류 핸들러가 출력되지 않는다. 우리가 지정한 오류 출력 메서드가 실행을 종료해버리기 때문이다.
  next(err);
  // next() 메서드에 아무것도 전달하지 않으면 오류 스택이 출력되지 않는다.
  console.log(err);
  // err를 출력해도 오류 스택이 콘솔에 출력된다.
})
```

next(err)를 사용하면 Express 내장 오류 핸들러가 실행되고 console.log(err)를 사용하면 로그에 오류 내용이 출력된다.

## 사용자 지정 오류 클래스

```js
// AppError.js
class AppError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = AppError;
```

에러가 발생했을 때 상태코드와 메시지를 반환하는 함수를 만들었다.

```js
// index.js
...
const AppError = require('./AppError');
...
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === 'chickennugget') {
    next();
  }
  throw new AppError('password required', 401)
}
```

에러가 발생하면 위에서 만든 AppError() 함수를 사용하여 상태코드 401과 'password required'라는 문구를 반환한다.  
JavaScript나 Express에서 오류를 발생시키면 모든 오류는 자동으로 스택이 생긴다. 어디서 오류를 발생시켰는지 나타내는 스택 추적이다.

```js
...
app.use((err, req, res, next) => {
  const { status } = err;
  res.status(status).send('ERRORRRRR!!')
})
// 실행하면 위에서 설정한 401 상태코드가 나온다.
```

```js
...
app.get('/error', (req, res) => {
  chicken.fly()
})
...
// 이것은 JavaScript 구문 에러이므로 status를 반환하지 않고 undefined를 반환한다.
```

```js
...
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something Went Wrong' } = err;
  res.status(status).send(message)
})
// status의 default 값을 500 으로 지정해 줬기 때문에 chicken.fly()를 실행하면 undefined가 아니라 상태코드 500이 반환된다.
...
```

JavaScript Error는 앱 에러가 아니기 때문에 상태코드를 반환하지 않고 undefined를 반환한다. 그래서 default값을 지정해 줘야 한다.  
Express Error는 앱 에러이기 때문에 에러가 발생하면 status 값을 가져와서 상태 코드로 회신한다.

## 비동기 오류 처리하기

```js
// AppError.js
class AppError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = AppError;
```

기존의 만들었던 Error 발생 시 message와 status를 설정하는 함수를 가져왔다.

```js
// index.js
...
const AppError = require('./AppError');
...
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  if (!product) {
    throw new AppError('Product Not Found', 404);
  }
  res.render('products/sho', { product })
})
// product의 id를 찾지 못하면 에러가 발생하고 Product Not Found 라는 문구와 상태코드 404를 반환한다.
...
app.use((err, req, res, next) => {
  const { status = 500, message = 'Someting went wrong' } = err;
  res.statuse(status).send(message);
})
```

위 코드를 실행하면 화면에 Product Not Found 라는 문구를 출력하지 않는다. 비동기 함수가 아닌 경우(사용자 지정 오류 클래스) 실행 했을 땐 문구가 화면에 출력되고 로그에 상태코드가 반환되었다. 하지만 비동기 함수에서는 문구가 화면에 출력되지 않고 terminal 출력에서 문구를 확인할 수 있다.  
이러한 차이가 생기는 이유는 비동기 함수에서 반환된 오류의 경우에는 next()함수로 전달하여 Express가 잡아내서 처리할 수 있게 해야 하기 때문이다.

```js
// index.js
...
const AppError = require('./AppError');
...
app.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  if (!product) {
    return next(new AppError('Product Not Found', 404))
  }
  res.render('products/show', { product })
})
// next(...) 를 return문으로 반환하지 않으면 name값이 null이라는 에러가 발생한다. 그 이유는 next(...)를 이용해서 에러 핸들러 함수를 실행한 후에 요청-응답 주기가 종료되는데 res.render은 그래도 EJS로 { product } 를 전달하고, 상품은 없는 상태이다.
// 즉, 이렇게 작동되면 템플릿을 컴파일한다는 뜻이다. 그래서 name에 null이 뜬다. 하지만 return문을 사용하면 res.render() 가 실행되지 않기 때문에 정상적으로 작동한다.
// 또 다른 방법으로는 else 를 써서 res.render()가 실행되지 않게 하는 것이다.
...
app.use((err, req, res, next) => {
  const { status = 500, message = 'Someting went wrong' } = err;
  res.statuse(status).send(message);
})
```

next() 의 경우 err를 전달하면 에러 핸들러가 실행되지만, 아무것도 전달하지 않으면 다음 라우터를 실행하려고 한다.  
그러므로 next() 에 에러를 전달하고, return문으로 종료해주면 화면에 메시지가 출력되고 상태코드도 잘 반환된다.

## 비동기 오류 처리 더 알아보기

보통 비동기 함수에서는 try...catch 문으로 오류를 처리한다.

```js
...
app.post('/products', async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
  } catch (e) {
    next(e);
  }
})
...
```

오류가 나올 것 같은 부분을 try 키워드를 이용해 감싸고, 그 부분에서 오류가 나오면 catch 문이 실행된다. catch 문 안에 있는 next(e) 가 오류 핸들러를 작동시키고 오류 내용이 출력된다.

## 비동기 유틸리티 정의하기

비동기 작업을 할 때는 try...catch문을 일일이 작성하여 에러가 발생하는 경우를 대비해줘야 한다. 하지만 일일이 try...catch문을 작성하기 번거롭기 때문에 에러를 잡는 함수를 만들고, 그 함수로 비동기 작업을 감싸주면 try...catch문을 작성하지 않아도 에러를 잡을 수 있다.

```js
...
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(e => next(e))
  }
}

app.get('/products/:id', wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Produce.findById(id)
  if (!product) {
    throw new AppError('Product Not Found', 404);
  }
  res.render('products/show', { product })
}))
```

## mongoose 오류 구분하기

mongoose 에는 많은 종류의 오류가 있다. 각 오류들 간에 차이가 있기 때문에 실행시킬 로직을 알맞게 결정해야 한다.

예를 들어 입력값을 입력해야 하는데 입력값이 입력되지 않았을 경우 발생하는 유효성 검사 오류일 경우 입력값을 입력해야 하는 부분으로 focus를 이동시키고, 빨간 글씨로 '값을 입력해주세요.' 처럼 로직을 작성할 수 있다.  
경로를 잘못 입력했을 경우엔 에러 페이지로 이동해서 경로가 잘못 되었다고 알려줄 수도 있다.
