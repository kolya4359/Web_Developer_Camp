# 콜백과 배열

## forEach

forEach는 함수를 인수로 받아들인다.  
기본적으로 forEach는 배열 안의 아이템 각각에 대해 함수와 코드를 한 번씩 실행한다.  
그래서 어떤 함수를 넣든 상관없이 함수가 아이템별로 한 번씩 호출되고 각각의 아이템이 함수에 자동으로 전달된다.  
출력뿐만 아니라 배열 안의 요소에 무언가를 각각 한 번씩 적용하기 위해 많이 사용했다.  
for...of문을 써도 되지만, for...of 문이 나오기 전에 forEach 문법을 많이 사용했었다.

```js
// 예시 1
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function (el) {
  if (el % 2 === 0) {
    console.log(el);
  }
});
// 2
// 4

// 예시 2
const movies = [
  {
    title: "Amadeus",
    score: 99,
  },
  {
    title: "Stand By Me",
    score: 85,
  },
  {
    title: "Parasite",
    score: 95,
  },
];

movies.forEach(function (movie) {
  console.log(`${movie.title} - ${movie.score}/100`);
});
// Amadeus - 99/100
// Stand By Me - 85/100
// Parasite - 95/100
```

## Map 메서드

Map은 콜백 함수를 수령해서 배열의 요소당 1번씩 실행한다는 점에서 forEach와 비슷하다. 하지만 큰 차이점이 있는데 그 다음에 그 콜백의 반환 값을 이용해서 새로운 배열을 생성한다는 것이다.

```js
const numbers = [1, 2, 3, 4, 5];

const doubles = numbers.map(function (num) {
  return num * 2;
});
doubles; // [2,4,6,8,10];
```

## 화살표 함수

함수 표현식을 더 간결하게 만들 수 있도록 도와준다.

### 사용법

```js
const square = (x) => {
    return x * x;
}

const sum = (x, y) => {
    return x + y;
}

const rollDie = () => {
    return Math.floor(Math.random() * 6) +1;
}

const 변수 =(인수) => {
    함수 실행부
}
```

### 화살표 함수의 반환

return 구문이 간략할 경우 return 키워드를 암시적으로 생략할 수 있다.

```js
const isEven = function (num) {
  return num % 2 === 0;
}; // regular function expresion
const isEven = (num) => {
  return num % 2 === 0;
}; // arrow function with parens around param
const isEven = (num) => {
  return num % 2 === 0;
}; // no parens around param
const isEven = (num) => num % 2 === 0; // implicit return
const isEven = (num) => num % 2 === 0;
// one-line implicit return

const rollDie = () => Math.floor(Math.random() * 6) + 1;
const add = (a, b) => a + b;
```

### 기존 예제에 화살표 함수 적용하기

```js
const movies = [
  {
    title: "Amadeus",
    score: 99,
  },
  {
    title: "Stand By Me",
    score: 85,
  },
  {
    title: "Parasite",
    score: 95,
  },
];

const newMovies = movies.map((movie) => `${movie.title} - ${movie.score / 10}`);
```

## setTimeout과 setInterval

이 함수들은 실행을 연기하고, 대기하고, 중단하거나 추후 날짜로 실행을 연기하거나 또는 기본적으로 작업 일정을 정한다.

### setTimeout

setTimeout 함수에는 두 가지를 전달해줘야 한다.  
첫 번째는 콜백이고 두 번째는 그 함수의 실행을 연기시킬 시간인 밀리 초의 숫자이다.

```js
console.log("HELLO!!!!!");
setTimeout(() => {
  console.log("...are you still there?");
}, 3000);

console.log("GOODBYE!!");
// HELLO!!!!! 가 출력되고 3초 후에 ...are you still there? 이 실행된다. 그 사이에 GOODBYE!!가 실행된다.
// HELLO!!!!!
// GOODBYE!!
// ...are you still there?
```

### setInterval, clearInterval

setInerval은 전달할 함수를 호출하는데 콜백을 매 특정 밀리 초 마다 호출하는 함수이다. 즉, 인터벌을 두고 작업을 반복하는 것이다.
clearInterval은 setInterval을 종료하는 함수이다.

```js
const id = setInterval(() => {
  console.log(Math.random());
}, 2000);

// clearInterval(id);

// 2초 간격으로 setInterval의 콜백 함수가 실행된다.
// clearInterval에 setInterval을 저장한 변수를 인수로 넣어주면 해당 setInterval을 종료시킬 수 있다.
```

## filter 메서드

filter는 요소로 구성된 배열에서 필터링을 하거나 부분 집합을 모아 새 배열을 만드는 데 쓰인다.  
함수를 전달해서 참이나 거짓을 반환하고 지정된 요소에 대해 참이 반환되면 해당 요소는 필터링되어 만들어진 새 배열에 추가된다.

```js
const numbers = [1, 2, 3, 4, 5];

numbers.filter((n) => {
  return n < 5;
}); // [1,2,3,4]

const movies = [
  {
    title: "Amadeus",
    score: 99,
  },
  {
    title: "Stand By Me",
    score: 85,
  },
  {
    title: "Parasite",
    score: 95,
  },
];

const goodMovies = movies.filter((m) => m.score >= 90);
// goodMovies = [{title: "Amadeus", score: 99}, {title: "parasite", score: 95}];
const badMovies = movies.filter((m) => m.score < 90);
// badMovies = [{title: "Stand By Me", score: 85}];

movies.filter((m) => m.score > 90).map((m) => m.title);
// ["Amadeus", "Parasite"];
```

## Every, Some

불리언 메서드라서 참이나 거짓 값을 반환한다.  
새 배열을 반환하는 map, filter와는 달리 이 둘은 항상 참이나 거짓을 반환한다. 즉, 테스트를 하는 방법이다.  
배열 내의 모든 요소가 every를 통해 테스트를 거치는데 일단 함수를 전달하고, 모든 요소가 해당 함수로 전달되어 참을 반환하면 호출된 전체 every 함수가 참을 반환한다.

```js
const words = ["dog", "dig", "log", "bag", "wag"];

words.every((word) => {
  return word.length === 3;
}); // true

words.every((word) => word[0] === "d"); // false

words.every((w) => {
  let last_letter = w[w.length - 1];
  return last_letter === "g";
}); // true
```

some 은 요소 중 하나 또는 일부가 테스트를 통과하는지 여부를 테스트한다.  
every처럼 모든 각각의 요소가 해당 콜백에서 참을 반환하는지는 상관하지 않고, some에서는 하나 이상인지 여부만 본다.  
some은 하나라도 true이면 true를 반환한다. 어떤 요소가 true인지 알 수는 없다. ture인 요소를 알고 싶을 땐 filter 메서드를 쓰면 된다.

```js
const words = ["dog", "dig", "log", "bag", "wag"];

words.some((word) => word[0] === "d"); // true
```

### Reduce

배열을 가져다가 점차 줄여가면서 마지막에는 결국 하나의 값만 남긴다.  
그 방법은 우리가 정하면 된다.

```js
[3, 5, 7, 9, 11].reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});
```

| Callback    | accumulator | currentValue | return value |
| :---------- | :---------- | :----------- | :----------- |
| first call  | 3           | 5            | 8            |
| second call | 8           | 7            | 15           |
| third call  | 15          | 9            | 24           |
| fourth call | 24          | 11           | 35           |

첫 번째 인자인 accumulator에 배열의 첫 번째 요소인 3이 들어가고, 두 번째 인자인 currentValue에 두 번째 인자인 5가 들어간다. return문에 따라 3+5가 실행되고 8이 반환된다. 반환된 값은 다시 accumulator에 들어가고, 세 번째 요소인 7이 currentValue에 들어가서 15가 반환된다.

reduce 함수의 첫 번째 인자는 초깃값이다. 처음 실행될 때 배열이나 객체의 첫 번째 요소가 들어가고, 그 다음부터는 반환값이 들어간다.  
두 번째 인자는 배열이나 객체의 요소가 들어간다. 반환문에 정해준 동작에 따라 첫 번 째 인수와 연산이 되고 나면, 그 다음 요소가 들어온다.

```js
// 최솟값을 구하는 예제
const prices = [9.99, 1.50, 19.99, 49.99, 30.50];

prices.reduce((min, price) => {
    if (price < min) {
        return price;
    }
    return min;
})  // 1.50

// 객체가 들어있는 배열에서 ruduce 사용
const movies = [
    {
        title: 'Amadeus',
        score: 99,
        year: 1984
    },
    {
        title: 'Sharknado',
        score: 35,
        year: 2013
    },
    {
        title: '13 Going On 30',
        score: 70,
        year: 2004
    },
    {
        title: 'Stand By Me',
        score: 85,
        year: 1986
    },
    {
        title: 'Waterworld',
        score: 62,
        year: 1995
    },
    {
        title: 'Parasite',
        score: 95,
        year: 2019
    },
    {
        title: 'Notting Hill',
        score: 77,
        year: 1999
    },
]

const highestRated = movies.reduce((bestMovie, currMovie) => {
    if (currMovie.score > bestMovie.score) {
        return currMovie;
    }
    return bestMovie;
})

// accumulator 매개변수에 시작하는 초기 포인트 지정하는 예제
const evens = [2, 4, 6, 8];
eves.reduce((sum, num) => sum + num), 100)
// 첫 번째 인자인 (sum, num) => sum + num 의 값이 2+4+6+8=20 이므로 20이 나온다. 20이 첫번째 인자인 sum으로 들어가고 두 번째 인자로 넣어준 100이 두 번째 인자인 num 으로 들어가서 120이 출력된다.
```

## 화살표 함수와 this

this 키워드를 사용하면 화살표 함수는 다르게 동작한다.  
화살표 함수가 아닌 일반 함수를 사용했을 때와 다르게 동작한다.

```js
// 함수 표현식에서 this
const person = {
  firstName: "Viggo",
  lastName: "Mortensen",
  fullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
}; // person.fullName() -> Viggo Mortensen
// this는 함수 왼쪽의 person을 가리킨다.

// 화살표 함수에서 this
const person = {
  firstName: "Viggo",
  lastName: "Mortensen",
  fullName: () => {
    return `${this.firstName} ${this.lastName}`;
  },
}; // person.fullName() -> undefined undefined
// 화살표 함수에서 this는 Window 객체를 가리킨다.
```
