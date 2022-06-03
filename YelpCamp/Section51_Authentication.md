# Section51: YelpCamp: 인증된 상태에서 추가하기

## passport 개요

Node.js 를 위한 인증 미들웨어이며, Express 기반 웹에서 유용하게 사용할 수 있다. Facebook, Twitter 등 소셜 로그인 인증을 지원한다.

## 사용자 모델 작성하기

사용자 이름과 암호 같은 사용자 정보를 저장할 수 있는 사용자 모델을 만든다.
passport-local-mongoose 패키지를 사용하면 사용자 이름과 해시, 솔트 필드와 솔트 값을 추가하고, 스키마에 부가 메서드를 추가해준다.

## Passport 구성하기

> passport.use(new LocalStrategy(User.authenticate()));  
> User 모델에 정적 메서드를 사용할 수 있게 설정한다.

> passport.serializeUser(User.serializeUser());  
> passport.deserializeUser(User.deserializeUser());

새로운 사용자 생성을 하드코딩하는 라우트를 만들고 passport가 잘 작동하는지 확인한다.

```js
app.get("/fakeUser", async (req, res) => {
  const user = new User({ email: "coltttt@gmail.com", username: "coltttt" });
  const newUser = await User.register(user, "chicken");
  res.send(newUser);
});
// 실행하면 username, id, email, salt, hash 값이 나온다.
// passport는 Pbkdf2 암호 해시 함수를 사용한다.
```

## 등록 양식

간단한 회원가입 폼을 설정한다. 회원가입 관련 라우트도 만들어준다.  
먼저 get 요청으로 회원가입 양식을 보여주는 라우트와 템플릿을 만들고, post 요청으로 폼 데이터를 전송하는 라우트를 만든다.

## 등록 경로

post 요청 라우터에 폼 데이터를 가져와서 새로운 사용자를 생성한다. 우선 기본 사용자 모델 인스턴스를 만든다.

## 로그인 경로

로그인 라우트는 두 가지를 만든다. get 요청으로 로그인 템플릿을 렌더링하고 post요청으로 입력된 정보를 제출한다. 이걸 통해 로그인 할 때 입력 정보가 일치하는지 확인하는 과정을 거친다.

## isLoggedIn 미들웨어

로그인하지 않으면 새 캠핑장을 생성할 수 없도록 구현한다.  
사용자 ID를 세션에 저장하고 그 정보를 찾도록 하는데 passport가 도움을 주는 메서드를 제공한다. 이 메서드는 세션을 이용해서 고유의 정보를 저장한다.  
앞에서 사용한 serializeUser나 deserializeUser 메서드들이 세션에 정보를 어떻게 저장하고 가져오는지를 결정하는 메서드이다.  
지금 우리가 사용할 메서드는 passport의 isAuthenticated이다. 요청 객체에 자동으로 추가된다.  
routes/campgrounds.js 파일의 campgrounds/new 경로 라우트에 isAuthenticated() 메서드를 사용한다. 로그인이 안 한 상태면 로그인 페이지로 이동하게 된다. 작동이 잘 되는 것을 확인하면, 해당 기능을 미들웨어로 만든다. 다른 곳에서도 쓰이기 때문에 따로 분리해서 관리하는 것이 효율적이다.  
미들웨어를 모아 놓을 middleware.js 파일을 만들고 거기서 관리한다.  
캠핑장 정보를 보여주는 campgrounds/show 경로의 라우트를 제외하곤 모두 isLoggedIn 미들웨어를 적용한다.

## 로그아웃 추가하기

routes/users.js 파일에에 로그아웃 라우트를 작성한다.  
그 다음 navbar에 로그인 / 회원가입 / 로그아웃 버튼을 만든다.

## currentUser 도우미

상단의 링크를 표시하거나 숨기는 방법을 알아보자.  
Logout이나 Register, Login 버튼을 항상 띄울 필요는 없고, 로그인 상태에 따라 달라질 수 있다. 그러려면 사용자의 로그인 여부를 먼저 알아야 한다.  
현재 passport가 제공하는 isAuthenticated 메서드를 사용하고 있다. 이 메서드는 req.user를 이용하면 자동으로 정보를 담기 때문에 그 안에 사용자에 대한 정보가 담길 것이다.  
로그인 상태에 따라 내비게이션 바에서 링크를 표시하거나 숨기는 방법 중 하나로 내비게이션 바 호은 렌더링하고자 하는 곳에 req.user를 전달하는 방이이 있다. 하지만 모든 요청마다 내비게이션 바가 있으므로 일일이 전달하기보단 app.js에서 보편적으로 사용하는 편이 효율적이다.

## 레지스터 경로 고정하기

사용자가 회원가입을 해서 성공적으로 계정이 생성되었다면 플래시와 리다이렉트 과정을 생략하도록 하자. 대신 로그인 상태는 유지해야 한다. 여기서는 req에 사용하는 login 메서드를 이용한다.  
passport에서 로그인 세션을 위해 지원하는 것으로 passport.authenticate는 req.login을 자동 호출한다. 사용자가 계정을 등록하거나 가입할 때 사용되는 것으로 새로운 사용자가 자동으로 로그인 상태를 유지하도록 한다.

## ReturnTo 명령어 특징

사용자가 로그인 상태로 바꾸거나 인증된 사용자인지 확인할 때 사용자가 최초로 요청을 보낸 페이지를 기억하도록 해보자. 인증된 사용자가 아니라면 그들이 요청한 URL은 보관하고 /login으로 리다이렉트한다. 로그인에 성공하면 보관하고 있던 URL로 리다이렉트하고, 보관중이던 URL은 삭제하도록 한다.
