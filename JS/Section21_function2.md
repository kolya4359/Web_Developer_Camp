# 함수 레벨 업

## scope

접근할 수 있는 범위.

### 함수 범위

```js
// 예시 1
let bird = "mandarin duck";
function birdWatch() {
  let bird = "golden pheasant";
  bird; // 'golden pheasant'
}
bird; // 'mandarin duck'

// 예시 2
function collectEggs() {
  let totalEggs = 6;
}
console.log(totalEggs);

// 함수 안에서 let 키워드를 사용해서 생성한 변수는 함수 밖에서 참조가 불가능하다.
// 그래서 totalEggs를 함수 밖에서 출력하면 에러가 나온다.

let totalEggs = 0;
function collectEggs() {
  totalEggs = 6;
}
console.log(totalEggs); // 0
collectEggs();
console.log(totalEggs); // 6

// 함수 밖에서 let 키워드로 totalEggs에 값을 할당하고 함수 안에서는 재할당을 사용해 totalEggs 변수를 사용할 수 있다.
// 그래서 처음에 totalEggs를 출력하면 기존에 할당했던 값인 0이 나오고, collectEggs() 를 실행하고 나면 함수 안에서 재할당 했던 6이 나온다.
```

const 키워드도 let 키워드와 동일하다.

### 블록 범위

```js
for (var i = 0; i < 5; i++) {
  var msg = "message";
}
console.log(msg); // message * 5
console.log(i); // 5

// var 키워드를 사용하면 함수 안에서 할당했어도 함수 밖에서도 사용 가능하다.
```

### 렉시컬 범위

부모 함수의 안에 중첩된 내부 함수는 해당 외부 함수의 범위에나 또는 범위 내에서 정의된 변수에 액세스할 수 있다.  
하지만 외부 함수는 내부 함수에서 정의된 변수에 접근할 수 없다.

```js
function outer() {
  let hero = "Black Panther";

  function inner() {
    let cryForHelp = `${hero}, please save me!`;
    console.log(cryForHelp);
  } // 부모 함수의 hero 변수에 접근할 수 있다.

  inner(); // 내부 함수를 실행 시키지 않으면 외부 함수를 실행시켜도 내부 함수는 동작하지 않는다.
}
```

## 함수 표현식

함수를 정의하는 또다른 방법.

```js
// 함수 선언문
function add(x, y) {
  return x + y;
}
add(1, 2); // 3
// add라는 이름의 함수를 선언했다.

// 함수 표현식
const square = function (num) {
  return num * num;
};
square(7); // 49
// 이름이 없는 함수를 square이라는 변수에 저장했다.
```

함수 표현식에서 알 수 있는 것은 JavaScript에서는 함수도 값으로 처리된다는 것이다. 숫자나 배열, 객체를 저장하고 전달하는 것처럼 함수도 저장하고 전달할 수 있다. 함수를 인수로 전달할 수도 있고, 함수를 반환값으로 반환할 수 있다.

## 고차함수

다른 함수와 함께 작동하거나 다른 함수에서 작동하는 함수를 표현한 것.  
다른 함수를 인수로 받아서 그 인수로 어떤 작업을 하는 함수이거나 함수를 반활할 수 있는 함수이다.

```js
function callTwice(func) {
  func();
  func();
}

function rollDie() {
  const roll = Math.floor(Math.random() * 6) + 1;
  console.log(roll);
}

callTwice(rollDie);
// 4
// 2

// 주의할 점은 callTwice(rollDie()) 이런 식으로 사용하면 안된다.
// 함수() 는 즉시 실행이라는 뜻이어서 rollDie가 실행되어 1~6 사이의 수가 반환되고, callTwice(1~6) 이런 식으로 전달 되기 때문이다.
```

## 반환 함수

### 팩토리 함수

함수를 만들어주는 함수.  
팩토리 함수는 함수를 반환하는데 그 함수에는 이름이 없다. 그냥 값으로 반환되었다.

```js
// makeBetweenFunc 가 팩토리 함수이다.
function makeBetweenFunc(min, max) {
  return function (num) {
    return num >= min && num <= max;
  };
}
// 팩토리 함수가 반환한 이름 없는 함수를 변수에 담아 함수로 만들어 사용한다.

const isChild = makeBetweenFunc(0, 18);
isChild(20); // false
const isAdult = makeBetweenFunc(19, 64);
isAdult(40); // true
const isSenior = makeBetweenFunc(65, 120);
isSenior(130); // false
```

## 메서드

메서드는 객체에 종속된 특성으로 함수에 포함되는 개념이다.  
모든 메서드는 함수이지만 모든 함수가 메서드인 건 아니다.

```js
const myMath = {
  PI: 3.14159,
  square(num) {
    return num * num;
  },
  cube(num) {
    return num ** 3;
  },
};

myMath.cube(2); // 4
myMath["cube"](4); // 64
// 메서드에 접근하는 두 가지 방법.
```

## This

메서드에 있는 객체를 가리킬 때 this 키워드를 사용한다.

```js
const cat = {
  name: "Blue Steele",
  color: "grey",
  breed: "scottish fold",
  meow() {
    console.log(this.color);
    console.log(`${this.name} says MEOWWWW`);
    // console.log(color)로 작성하면 에러가 뜬다.
    // this 키워드로 상위 객체인 cat의 color에 접근해야 한다.
  },
};
```

하지만 사용된 함수의 호출 커넥스트에 따라 값이 달라지기 때문에 this가 가리키는 객체가 바뀔 수 있다. 이것은 함수를 호출하는 방법에 따라 바뀐다.

```js
const cat = {
  name: "Blue Steele",
  color: "grey",
  breed: "scottish fold",
  meow() {
    console.log("THIS IS:", this);
    console.log(`${this.name} says MEOWWWW`);
  },
};

const meow2 = cat.meow;

cat.meow(); // THIS IS: cat{...} - this가 cat객체를 가리킴.
meow2(); // THIS IS: window{...} - this가 window객체를 가리킴.
```

meow2() 에서 () 는 . 왼쪽을 가리킨다. meow2() 왼쪽에는 아무것도 없는 것 같지만 사실 wiondow 객체가 생략되어 있다.  
그래서 meow2() 의 this는 window 객체를 가리키는 것이다.  
Window 객체는 JavaScript의 최상위 객체이다. alert() 메서드도 사실 window.alert() 인데 window. 가 생략되어 있는 것이다.

# Try/Catch

error 가 발생하거나 발생할 것 같은 구간을 try {...} 문으로 감싸준다.  
try {...} 문 안에서 error가 발생하면 catch{...} 문이 실행되고 안전하게 프로그램이 멈춘다.  
비동기 함수를 이용하여 통신을 할 때 자주 사용된다.

```js
function yell(msg) {
  console.log(msg.toUpperCase().repeat(3));
}
// msg 인수에 문자열을 넣으면 잘 작동하지만 숫자를 넣으면 에러가 발생한다.

function yell(msg) {
  try {
    console.log(msg.toUpperCase().repeat(3));
  } catch (e) {
    console.log(e);
    console.log("Please pass a string next time!");
  }
}
// msg에 문자열을 넣으면 잘 작동하지만 다른 타입을 넣으면 catch문이 실행되어 에러가 출력되고, Please pass a string next time! 문구가 나온다.
```
