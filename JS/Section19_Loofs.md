# Section 19: 루프의 구조

# 루프 Loof (반복문)

루프의 핵심은 어떤 기능을 반복하는 것이다.

## for loof

for ( 초깃값, 조건식, 실행식) {
실행문
}

```js
for (let i = 0; i <= 10; i++) {
  console.log(i);
}
// i = 1에서 시작해서 i가 10보다 작거나 같을 경우, 실행문을 실행하고 i에 1을 더한다.
```

```js
// 0 ~ 20 에서 짝수만 출력하는 루프
for (let i = 0; i <= 20; i += 2) {
  console.log(i);
}

// 0 ~ 20 에서 홀수만 출력하는 루프
for (let i = 1; i <= 20; i += 2) {
  console.log(i);
}

// 100 에서 10씩 작아지는 수를 출력하는 루프
for (let i = 100; i >= 0; i -= 10) {
  console.log(i);
}
```

### 무한 루프

무한 루프는 조건식이 계속 true가 돼서 멈추지 않고 계속 돌아가는 루프를 말한다. 무한 루프가 되면 메모리를 계속 소진하다가 프로그램을 멈춰버리게 할 수 있기 때문에 주의해야 한다.

```js
// 무한루프 예제
for (let i = 20; i >= 0; i++) {
  console.log(i);
}
```

## 배열 루프

배열에 들어있는 요소값을 출력할 때 루프를 사용한다.

```js
const animals = ["lions", "tigers", "bears"];
for (let i = 0; i < animals.length; i++) {
  console.log(i, animals[i]);
}
// 0 'lions'
// 1 'tigers'
// 2 'bears'
```

## 중첩 루프

for 루프 안에 또다른 for 루프가 있는 것.

```js
let str = "LOL";
for (let i = 0; i <= 4; i++) {
  console.log("Outer:", i);
  for (let j = 0; j < str.length; j++) {
    console.log("   Inner:", str[j]);
  }
}
/* 출력
Outer: 0
    Inner: L
    Inner: O
    Inner: L
Outer: 1
    Inner: L
    Inner: O
    Inner: L
Outer: 2
    Inner: L
    Inner: O
    Inner: L
...
*/
```

배열 안에 배열이 들어 있는 경우에 하위 배열의 요소를 출력할 때도 중첩 루프를 사용한다.

```js
const seatingChart = [
    ['Kristen', 'Erik', 'Namita'],
    ['Geoffrey', 'Juanita', 'Antonio', 'Kevin'],
    ['Yuma', 'Sakura', 'Jack', 'Erika']
]

for (let i = 0; i < seatingChart.length; i++) {
    const row = seatingChart[i];
    console.log(`ROW #${i + 1}`)
    for ( let j = 0; j < row.length; j++) {
        console.log(row[j]);
    }
}

// for..of 루프
for (let row of seatingChart) {
    for (let student of row) {
        console.log(student);
    }
}
/* 출력
ROW #1
Kristen
Erik
Namita
ROW #2
Geoffrey
Juanita
...
/*
```

## while 루프

반복 횟수가 정해져 있지 않을 때 while 루프를 사용하면 유용하다.  
몇 번을 반복할지 알 수 없고 사용자의 입력값을 포함할 수 있다.

```js
const SECRET = "BabyHippo";

let guess = prompt("enter the secret code...");
while (guess !== SECRET) {
  guess = prompt("enter the secret code...");
}
console.log("CONGRATS YOU GOT THE SECRET!!!");

// 사용자가 암호를 입력할 수 있는 프롬프트를 띄우고 SECRET을 정확히 입력하면 CONGRATS YOU GOT THE SECRET!!! 이 출력된다.
// 사용자가 암호를 얼마나 틀릴지 알 수 없고, 암호를 맞출 때까지 계속 반복된다.
```

### break

while 루프 는 조건식이 true이면 끊임없이 반복한다.  
break 키워드를 사용해서 조건이 충족되면 멈출 수 있다.

```js
let input = prompt("Hey, say something!");
while (true) {
  input = prompt(input);
  if (input.toLowerCase() === "stop copying me") break;
}
console.log("OK YOU WIN!");
// 사용자가 입력한 input 값이 프롬프트를 통해 계속 나오다가 사용자가 stop copying me 를 입력하면 break 키워드로 인해서 while 루프가 종료되고, 콘솔창에 OK YOU WIN!이 출력된다.
```

### 간단한 추측 게임 예제

```js
let maximum = parseInt(prompt("Enter the maximum number!"));
while (!maximum) {
  maximum = parseInt(prompt("Enter a valid number!"));
}

const targetNum = Math.floor(Math.random() * maximum) + 1;
let attempts = 1;

while (parseInt(guess) !== targetNum) {
  if (quess === "q") break;
  attempts++;
  if (guess > targetNum) {
    guess = prompt("Too high! Enter a new guess:");
  } else {
    guess = prompt("Too low! Enter a new guess:");
  }
}
if (guess === "q") {
  console.log("OK, YOU QUIT!");
} else {
  console.log("CONGRATS YOU WIN!");
  console.log(`YOU GOT IT! It took you ${attempts} guesses`);
}
// 처음에 사용자가 최대 숫자를 정한다.
// 그리고 최대 숫자 안에서 랜덤 숫자를 targetNum 에 넣고 그 값을 맞추면 된다.
// targetNum을 맞추지 못했을 경우 추측이 targetNum보다 크면 너무 크다는 문구를, 반대의 경우 작다는 문구를 출력하고, 맞췄을 경우 콘솔에 YOU GOT IT!을 출력한다.
```

## for ... of

for ... of 사용법

```js
for (variable of iterable) {
  statement;
}
```

for ... of 는 for(let 요소를 담을 변수 of 반복 가능한 객체) {실행문} 으로 사용한다.  
배열을 한번씩 순회해서 요소를 출력하거나 인덱스가 필요하지 않는 경우, for...of를 사용해서 간결하게 쓸 수 있다.

```js
const subreddits = ["cringe", "books", "chickens", "funny"];
for (let sub of subreddits) {
  console.log(sub);
}
// cringe
// books
// chickens
// funny
```

## 객체 루프

### for ... in

상속된 열거 가능한 속성들을 포함하여 객체에서 문자열로 키가 지정된 모든 열거 가능한 속성에 대해 반복합니다.  
for ... in을 사용하면 객체의 키 값을 출력할 수 있고, 이것을 이용해 값을 이용할 수 있다. 하지만 잘 쓰이지 않는다.

### Object 메서드

- Object.keys(객체변수) : 객체의 key들이 배열로 담겨서 반환된다.
- Object.values(객체변수) : 객체의 value들이 배열로 담겨서 반환된다.
- Object.entries(객체변수) : 객체의 키-값 쌍으로 된 중첩된 배열을 반환한다.

```js
const testScores = {
  keenan: 80,
  damon: 67,
  kim: 89,
  shawn: 91,
  marlon: 72,
  dwayne: 77,
  nadia: 83,
  elvira: 97,
  diedre: 81,
  vonnie: 60,
};

let total = 0;
let scores = Object.values(testScores);
for (let score of scores) {
  total += score;
} // 객체에서 값들을 배열로 추출해서 사용한다.
console.log(total / scores.length);
// 객체에는 길이가 없기 때문에 Object.values()를 이용해 값들을 배열로 반환했다.
```
