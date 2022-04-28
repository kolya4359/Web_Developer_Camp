# Section 15: JavaScript 문자열

## String 문자열

'' 나 "" 를 이용해 값을 감싸면 문자열이 된다.

```js
let favAnimal = "Dumbo Octopus"; // 공백을 넣어도 된다.
let num = "23"; // 23이 문자열로 저장된다.
```

문자열은 인덱싱된 조합이다.  
C H I C K E N  
0 1 2 3 4 5 6  
0부터 시작한다.

```js
let animal = "Dumbo Octopus";
animal[0]; // "D"
animal[6]; // "O"
animal[99]; // undefined
animal.length; // 13
// 문자열.length 는 문자열의 길이를 나타낸다.
"lol" + "lol"; // "lollol"
let firstName = "River";
let lastName = "Phoenix";
firstName + lastName; // "RiverPhoenix"
let fullName = firstName + " " + lastName;
fullName; // "River Phoenix";
1 + "hi"; // "1hi"
```

### String.method()

모든 문자열은 실질적으로 어떤 동작을 내포하고 있다.  
특정 문자열을 사용해 수행할 수 있는 이런 동작을 메서드라고 한다.  
method에 () 를 안 붙이면 호출은 되는데 실행은 안한다.

```js
let msg = "I am king";
let yellMsg = msg.toUpperCase(); // ' I AM KING'

let angry = "LeAvE mE aLoNe!";
angry.toLowerCase(); // 'leave me alone!'

let greeting = "  leave me alone plz  ";
greeting.trim(); // 'leave me alone plz';

let greeting = " hello again!!!!        ";
greeting.trim().toUpperCase(); // "HELLO AGAIN";
```

### argument 인수

인수란 메서드로 전달되어서 메서드의 동작을 변경하는 입력 값이다.

> thing.method(arg);

```js
// indexOf("찾는문자열")
let tvShow = "catdog";
tvShow.indexOf("cat"); // 0
tvShow.indexOf("dog"); // 3
tvShow.indexOf("z"); // -1 (not found)

// slice(첫번째 문자 index, 마지막 문자 index + 1)
let msg = "haha that is so funny!";
msg.slice(5); // "that is so funny!";
msg.slice(5, 9); // "that"
msg.slice(-1); // "!";

// replace(교체될 문자열, 교체할 문자열)
msg.replace("haha", "lolololol"); // "lolololol that is so funny!";

// repeat(반복 횟수)
"lol".repeat(3); // "lollollol";
```

### 템플릿 리터럴

문자열 안에 표현식을 내장할 수 있는 문자열들을 만들고 해당 표현식은 평가된 후에 문자열로 바뀐다.

- 템플릿 리터럴은 백틱(`)으로 감싼다.
- 백틱 안에서 표현식은 ${} 으로 감싼다.

```js
const qty = 5;
const product = "Artichoke";
const price = 2.25;
// 기존의 문자열
"You bought " +
  qty +
  " " +
  product +
  ". Total is: " +
  price *
    qty // 템플릿 리터럴 // "You bought 5 Artichoke. Total is: 11.25"
    `You bought ${qty} ${product.toUpperCase()}. Total is: $${
      price * qty
    }` // "You bought 5 ARTICHOKE. Total is: $11.25"
    `I counted ${3 + 4} sheep`; // "I counted 7 sheep";
```

## Null 과 Undefined

- null : 일부러 값을 지정하지 않는 걸로 설정한 것.
- undefined : 값이 정해지지 않은 것.

```js
let loggedInUser = null;
// 처음에 로그인한 이용자가 없기 때문에 null 로 빈 값을 넣는다.
let num;
num; // undefined
// 변수가 선언은 됐는데 값이 정해지지 않아서 불러올 수 없다.
```

## Math(수학) 메서드

1. 내림 메서드

- Math.floor 는 소수점이 포함된 숫자에서 소수점 뒤를 없앤다.

2. 올림 메서드

- Math.ceil 는 소수점이 포함된 숫자에서 소수점 뒤를 없애고 정수를 올린다.

3. 임의의 수 메서드

- Math.random() 은 임의의 숫자를 생성한다.

4. 지수 메서드

- Math.pow 는 첫 번째 인자가 가수고, 두 번째 인자가 지수이다.

```js
// 내림 메서드
Math.floor(23.99999); // 23;

// 올림 메서드
Math.floor(34.999); // 35;

// 임의의 수 메서드
Math.random(); // 0.5940789191348312;
// 1 ~ 10 사이의 자연수를 얻는 법
Math.random() * 10; // 5.961104892810127
Math.floor(Math.random() * 10) + 1; // 6
// 내림을 하면 0이 나올 수도 있기 때문에 + 1 을 해준다.

// 지수 메서드
Math.pow(2, 3); // 8 === 2 ** 3
```
