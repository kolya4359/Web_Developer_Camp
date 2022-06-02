# Section50: 인증에 관한 모든 것

## 인증과 권한부여

앞으로는 암호화에 필요한 기능들을 알아본다.  
해시 함수, 인증, 권환과 암호 솔트, Bcrypt, 복호화 등 여러 개념을 다룬다.

### 인증

특정 사용자가 누구인지 확인하거나 그 사용자가 제대로 된 사용자가 맞는지 확인하는 과정. 즉, 인증이란 누군가의 신원을 확인하는 일이다.

### 권한

특정 사용자가 가능한 행동을 확인하는 것.  
ex) 접근 가능 대상과 편집, 삭제가 가능한 대상, 웹사이트의 어느 부분에 접근이 가능한지 등.

## 패스워드를 저장하거나 하지 않는 방법

주의해야 할 점

1. 절대 암호를 데이터베이스에 그대로 저장하면 안 된다.

- **해시 함수**를 사용해서 암호를 해시화해서 해시 함수의 결과를 데이터베이스에 저장한다.

## 암호화된 해시 함수

임의의 길이를 갖는 입력값을 받아 고정된 길이의 해시값을 출력하는 함수이다.암호 알고리즘에는 키가 사용되지만, 해시 함수는 키를 사용하지 않으므로 같은입력에 대해서는 항상 같은 출력이 나오게 된다. 이러한 해시함수를 사용하는목적은 메시지의 오류나 변조를 탐지할 수 있는 무결성을 제공하기 위해 사용된다.

### CRYPTOGRAPHIC HASH FUNCTIONS ( 암호화 해시 함수 )

1. One-way function which is infeasible to invert  
   (반전이 불가능한 단방향 함수)
2. Small change in input yields large change in the output  
   (입력의 작은 변화는 출력의 큰 변화를 가져온다.)
3. Deterministic - same input yields same output  
   (결정적 - 동일한 입력이 동일한 출력을 생성한다.)
4. Unlikely to find 2 outputs with same value  
   (동일한 값을 가진 2개의 출력을 찾을 수 없다.)
5. Password Hash Functions are deliberately SLOW  
   (암호화 해시 함수는 의도적으로 느리다.)

### 단방향 암호화 (One-Way Encryption)

평문을 암호문으로 바꾸는 암호화는 가능하지만, 암호문을 평문으로 바꾸는 복호화는 불가능하다. 암호화만 가능하기 때문에 단방향 암호화라 한다.  
주로 암호화 해시 함수를 이용한 Hash 암호화 방식을 사용한다.

## 패스워드 솔트 ( Password Salts )

암호학에서 솔트(salt)는 데이터, 비밀번호, 통과암호를 해시 처리하는 단방향 함수의 추가 입력으로 사용되는 랜덤 데이터이다. 솔트는 스토리지에서 비밀번호를 보호하기 위해 사용된다.  
역사적으로 비밀번호는 시스템에 평문으로 저장되지만 시간이 지남에 따라 추가적인 보호 방법이 개발되어 시스템으로부터 사용자의 비밀번호 읽기를 보호한다. 솔트는 이러한 방식의 하나이다.  
솔트는 레이보 테이블과 같은 미리 계산된 테이블을 사용하는 공격을 방어한다.  
필수로 이해해야 하는 세 가지 사실이 있다.

1. 많은 사람들이 여러 웹사이트에서 같은 암호를 사용한다.

- 한 사람이 서로 다른 웹사이트에 같은 암호를 사용한다는 뜻.

2. 많은 사람들이 동일한 암호를 쓴다.

- 여러 사람이 한 사이트에 같은 암호를 사용할 수 있다는 뜻.

3. 암호를 저장하는 데 적합한 해시 알고리즘은 몇 개 밖에 없다.

단방향 암호는 동일한 입력값에는 동일한 출력값을 내놓기 때문에 만일 해커가 입력값에 대한 출력값과 우리가 사용하는 암호화 패키지를 알고있다면 쉽게 비밀번호를 찾아내 수 있다. 이것은 큰 문제이다.  
솔트는 암호화된 출력값에 임의의 값을 추가해서 해커로 하여금 입력값을 유추할 수 없게 만들어준다.

## bcrypt 개요

```js
bcrypt.hashpw(password, bcrypt.gensatl());
```

- 1999년에 publish된 password-hashing function이다.
- Blowfish 암호를 기반으로 설계된 암호화 함수이며 현재까지 사용중인 **가장 강력한 해시 메커니즘** 중 하나이다.
- 보안에 집착하기로 유명한 OpenBSD에서 사용하고 있다.
- .NET 및 Java를 포함한 많은 플랫폼, 언어에서 사용할 수 있다.
- 반복횟수를 늘려 연산속도를 늦출 수 있으므로 연산 능력이 증가하더라도 brute-forece 공격에 대비할 수 있다.

### Bcrypt가 추천되어지는 이유

bcrypt가 정답은 아니다. 또한 SHA 종류가 무조건 나쁘다는 것도 아니다.  
그러나 많은 보안관련 글들에서 SHA를 암호해싱에 사용하는 암호화 함수들은 **GPU를 이용한 공격에 취약** 하며 (SHA family는 연산속도가 매우빠르기 때문) 많은 메모리를 필요로 하지 않는 점을 문제로 지적하고 있다.

> Info  
> SHA가 보안에 결함이 있어서 안전하지 않기 때문이 아니라, SHA는 일반적으로 GPU연산에 유리한 32비트 논리 및 산술 연산만 사용하기 때문에, 공격자가 빠른연산으로 공격할 수 있기 때문이라는 것이다.  
> 그로 인해 Bcrypt 설계자들은 이런 문제로 SHA가 아닌 Blowfish를 이용하여 구현하였다.

이상적으로 봤을때 limit가 없는 연산 능력을 가진 공격자는 모든 종류의 암호화 알고리즘을 해독 할 수 있겠지만, 이는 어디까지나 이론적인 상황이지 실제로 공격자는 컴퓨터자원을 무제한으로 보유하지 않기 때문에, 공격자의 속도를 늦출 수록 암호화 해독이 어려워진다.  
어떤 암호화 함수(bcrypt, pbkdf2, scrypt, ..)를 쓰던 강력하지만, 충분한 시도 횟수, work-factor가 존재한다고 가정할 때, 방어자는 좀 더 느리게 설계된 암호화 방시기에 의존하는 것이 낫다고 생각된다.

### bcrypt 연습

```js
// 암호솔트를 생성하는 genSalt 메서드 사용법
bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
    // Store hash in your password DB.
  });
});
```

saltRound에서 Round는 해시의 난이도라고 보면 된다. 해시 난이도를 올릴 수 있는 Bcrypt의 핵심 기능이다. 해시 난이도를 올리면 해시를 계산하는데 걸리는 시간이 증가해 컴퓨터 하드웨어가 좋을 수록 계산을 늦출 수 있다.

```js
// BcryptDemo/index.js
const bcrypt = require("bcrypt");

const hashPassword = async () => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pw, salt);
  console.log(salt);
  console.log(hash);
};

hashPassword("monkey");

// console
// $2b$10$cUDT3BCQgKNJBKuc2.Jh0O
// $2b$10$cUDT3BCQgKNJBKuc2.Jh0OAtQA9Vvpzjm47D6TOxBFSig7Hm7EzSO
```

계속 출력해보면 'monkey' 값을 암호화해서 출력하는 것인데도 출력값이 계속 바뀐다. 솔트가 계속 바뀌기 때문이다. 데이터베이스에 저장한 출력 값과 대조할 때는 compare라는 메서드를 사용하면 된다.

```js
// compare() 사용법
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
  // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
  // result == false
});
```

```js
// BcryptDemo/index.js
...
const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("LOGGED YOU IN! SUCCESSFUL MATCH!")
    } else {
        console.lo("INCORRECT!")
    }
}

hashPassword('monkey');
login('monkey', '$2b$10$cUDT3BCQgKNJBKuc2.Jh0OAtQA9Vvpzjm47D6TOxBFSig7Hm7EzSO')

// login 출력값
// LOGGED YOU IN! SUCCESSFUL MATCH!
```

login에 평문과 hash 암호화 된 문자열을 넣으면 compare 메서드가 비교해서 result에 값을 저장한다. 평문과 hash 암호화 문자열이 같으면 "LOGGED YOU IN! SUCCESSFUL MATCH!", 다르면 "INCORRECT!"가 출력된다.

```js
// BcryptDemo/index.js
const bcrypt = require("bcrypt");

// const hashPassword = async () => {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(pw, salt);
//   console.log(salt);
//   console.log(hash);
// };

const hashPassword = async (pw) => {
  const hash = await bcrypt.hash(pw, 12);
  console.log(hash);
};
```

hash() 메서드에 횟수를 전달하면 전달된 횟수를 사용해 솔트를 생성하고 전달된 암호를 해시한 값을 반환한다.

## Auth Demo: 설정

user 인증을 해야만 페이지가 보이도록 연습을 해보자.  
50_AuthDemo 폴더를 만들고 그 안에 필요한 파일들과 패키지들을 설치한다.
우선 mongoose.User 모델을 만든다.  
index.js에 3000번 포트를 연결한다.
register 라우트를 만들고 ejs를 기본 템플릿으로 지정한 후 views 폴더에 register 파일을 작성한다.

## Auth Demo: 등록

register 파일에서 작성한 폼이 제출할 라우트를 구현한다.  
우선 mongoose를 이용해서 mongoDB와 연결한다.
그 다음 폼이 제출될 /register 라는 post 라우트를 만든다. get으로 요청하면 쿼리 문자열로 URL에 노출되기 때문에 post로 요청해야 한다(비밀번호가 노출되면 큰일난다).  
index.js 에서 req.body를 파싱해주고, register.ejs 파일에 post 요청 폼을 작성한다.  
입력된 사용자 이름과 암호로 새 user를 생성한다. 지금 생성하는 새 user 모델에 암호를 그대로 저장하면 안 된다는 것을 꼭 명심하자. bcrypt 패키지를 사용해 해시 암호를 만들고 그걸 데이터베이스에 저장한다.

## Auth Demo: 로그인

로그인 기능을 구현하려면 사용자 이름과 암호를 입력할 폼과 그 폼을 제출해 사용자를 인증할 수 있는 라우트를 만들어야 한다.
login용 get 요청 라우트로 템플릿을 만들고, post 요청 라우트로 입력된 값을 제출한다.  
첫 번째 단계는 이 사용자 이름을 가진 사용자를 찾는 것이다. 보통 찾을 때 findById를 사용했는데, 인증된 사용자를 대상으로 하는 이번 경우엔 ID를 얻을 수 없다. 그러니 사용자 이름으로 찾아야 한다.

> 암호를 틀렸거나 사용자를 찾을 수 없는 경우, 사용자에게 뭐가 문제인지 정확히 알려주면 된단다. 사용자 이름은 맞았지만 암호가 틀렸다는 식의 힌트를 주면 사용자가 그 힌트를 통해 정보를 추측할 수 있기 때문이다.

## Auth Demo: 로그인한 상태로 세션 유지

로그인 여부를 기억하고 /secret 라우트에 접근할 수 있게 한다. /secret 라우트는 로그인을 해야 볼 수 있도록 만든다.  
첫 번째 단계는 사용자의 로그인 여부를 확인하는 것이다. 세션이 여기서 필요하다.
로그인 시키려면 사용자 이름으로 사용자를 찾아 bcrypt.compare 함수를 해시하고 데이터베이스에 저장된 해시 암호와 그 출력값을 대조해 일치한다면 사용자 ID를 세션에 받아 리다이렉트한다.

## Auth Demo: 로그아웃

세션에서 공식적으로 사용자 ID를 제거하기만 하면 된다.
req.sesseion.user_id 를 삭제하거나 null 값을 주면 된다.

## Auth Demo: 로그인 미들웨어 요구

사용자의 로그인 여부를 확인하는 간단한 미들웨어를 작성한다. 사용자의 ID가 세션에 있는지 확인하는 미들웨어이다.

## Auth Demo: 모델 메서드 리팩토링

일부 로직을 적절한 상황에서 모델에 추가하는 법부터 해보자.  
우선 User 모델과 관련된 로직을 User 모델에 그룹화해서 index.js의 길이를 줄인다.  
User 모델에서 사용자 ID를 찾아서 로그인 했는지 안 했는지 확인하는 로직을 user 모델로 옮겼다.  
기존의 사용자를 등록할 때 암호를 먼저 해시하고 new User에 추가한 뒤 save 했었던 부분을 Mongoose와 모델이 알아서 암호를 해시하게 한다.
