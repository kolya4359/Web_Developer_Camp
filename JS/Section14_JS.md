# Section 14: JavaScript 기초!

# 자바스크립트의 원시타입

## 기본 원시타입

- Number 숫자
- String 문자열
- Boolean 논리값
- Null
- Undefined

## 외의 원시타입

- Symbol
- BigInt

## Number

- % : 나머지 연산자
  - ex) 9 % 2 = 1
  - 9를 2로 나누면 몫이 4가 되고 나머지가 1이 된다.
  - %는 나머지를 구하는 연산자이다.
- \*\* : 지수 연산자
  - ex) 2 \*\* 4 = 16
  - 2를 4번 거듭제곱해서 16이 나온다.
- Nan : Not a Number 숫자가 아니다.
  - ex) 0/0 // NaN
  - ex) 1 + NaN // NaN
- typeof 연산자
  - typeof 뒤에 피연산자를 쓰면 타입을 알려준다.
  - ex) typeof 4 // "Number"
  - typeof NaN 을 쓰면 "Number" 라고 나온다.  
    NaN은 숫자가 아니다를 뜻하지만 JavaScript에서는 숫자 타입 또는 숫자 패밀리 중 하나로 간주한다.

```js
// 간단한 숫자 퀴즈
4 + (3 * 4) / 2; // 10
(13 % 5) ** 2; // 9
200 + 0 / 0; // NaN
```

### Variables 변수

### 변수 사용법

변수는 값에 어떤 이름을 지정하고 JavaScript로 그 값을 저장하여 나중에 다시 돌아오거나 다시 쓰거나 업데이트하거나 불러올 수 있게 해준다.

> let year = 1945;

let은 변수 선언 키워드고 year은 변수 이름이고 1945는 변수의 값이다.

year 을 호출할 때마다 1945 값이 출력된다.

```js
let numHens = 5;
let numRoosters = 1;
numHens + numRoosters; // 6
let totalChickens = numHens + numRoosters;
// totalChickens에 5 + 1 (6) 의 값이 저장된다.
totalChickens; // 6
// numHens의 값을 바꾸고 싶으면 다음과 같이 한다.
numHens = numHens + 1; // 6
```

마지막에 numHens의 값을 바꾸었으니 totalChickens의 값도 바뀌었을 것 같지만, totalChickens의 값은 그대로 6이다.  
totalChickens의 값을 최신화하려면 다시 값을 저장해야 한다.

```js
totalChickens = numHens + numRoosters; // 7
```

### 변수 업데이트

```js
let score = 0;
score = score + 5; // 5;
score += 5; // 10, score = score + 5; 와 같은 의미이다.
score -= 7; // 3, score = score - 7; 와 같은 의미이다.
// score *= 2; 는 score = score * 2;
// score /= 2; 는 score = score / 2;

let numLives = 9;
numLives--; // 9, numLives = numLives - 1 와 같은 의미이다.
numLives; // 8
// -- 를 변수 뒤에 쓰면 한 번 더 호출해야 계산이 된다.
--numLives; // 7
// -- 를 변수 앞에 쓰면 계산된 값이 호출된다.

numLives++; // 7, numLives = numLives + 1 와 같은 의미이다.
numLives; // 8, ++도 -- 와 계산 순서가 같다.
```

### 변수 키워드 const, var

### const

- constant(상수) 의 줄임말. 상수는 항상 일정한 값이다.

```js
const luckyNum = 26;
luckyNum += 1; // Uncaught TypeError: Assingnment to constant variable.
luckyNum = 7; // Uncaught TypeError: Assignment to constant variable.
```

const는 조작이나 재할당이 안된다. const는 변하지 않는 값을 넣어야 한다.

### var

## Boolean 논리값

- Boolean은 true와 false 값만을 가지고 있다.
- 숫자 1은 true, 숫자 0은 false를 가리킨다.

# 변수 명명 방법

- 공백이 있으면 안된다.
  - let hello world = 11;
- 숫자로 시작하면 안된다.
  - 1user = 11;
- 변수를 명명할 때는 카멜케이스를 사용한다.
  - currentDate (카멜 케이스), current_date (스테이크 표기법)
- 변수에 boolean 값을 담을 때는 is 를 앞에 붙인다.
  - let isLoggedIn = false;
- 변수는 어떤 값을 담았는지 알 수 있게 해야 한다.
  - let n = 9; (X), let numUser = 11; (O)
