# JavaScript의 최신 기능들

## 기본 매개 변수 (default 매개변수)

매개변수가 입력되지 않았을 경우를 대비해 기본적으로 매개변수를 지정할 수 있다.  
매개변수로 값이 들어오면 들어온 값이 사용되고, 값이 들어오지 않으면 기본 매개변수가 사용된다.

```js
function rollDie(numSides = 6) {
  return Math.floor(Math.random() * numSides) + 1;
} // numSides 인자에 아무 값도 안 넣으면 6이 들어간다.

function greet(person, msg = "Hey there", punc = "!") {
  console.log(`${msg}, ${person}${punc}`);
}
/* 매개변수의 순서에 주의해야 한다.
function greet(msg = "Hey there", person) {
    console.log(`${msg}, ${person}`)
}
형식으로 작성하고 greet(Elsa); 를 입력하면 "Elsa, undefined" 가 출력된다.
그래서 기본 매개 변수가 없는 인자가 먼저 선언되어야 한다.
*/
```

### 함수 호출 시 스프레드 구문

배열과 같이 반복 가능한 객체를 전개 구문을 사용해서 확장한다.  
함수로 호출할 경우엔 0개 이상의 인수로, 배열 리터럴에서는 요소로 확장하고, 객체 리터럴의 경우 객체 표현식은 0개 이상의 키-값 쌍으로 확장할 수 있다.  
확장이란 어떤 것을 가져와서 펼친다는 뜻이다.

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
Math.max(nums); // NaN
// max()에 nums를 넣으면 숫자가 아니라 배열이 들어가서 숫자가 아니라고 나온다.
Math.max(...nums); // 10
// ...nums 로 스프레드 구문을 사용하면 배열의 요소값이 펼쳐지고, 인수는 따로따로 들어가서 그 중에서 최댓값을 찾는다.

console.log("hello"); // hello
console.log(..."hello"); // h e l l o
// 문자열을 넣어도 배열과 마찬가지로 하나씩 따로따로 출력된다.
```

### 행렬 리터럴과 스프레드 구문

```js
const cats = ["Blue", "Scout", "Rocket"];
const dogs = ["Rusty", "Wyatt"];

const animals = [...dogs];
// ['Rusty', 'Wyatt'];

animals.push("asdas");
animals; // ['Rusty', 'Wyatt', 'asdas'];
dogs; // ['Rusty', 'Wyatt'];
// 스프레드 구문으로 복사한 배열은 수정해도 원본 배열은 수정되지 않는다.

const allPets = [...cats, ...dogs];
// ['Blue', 'Scout', 'Rocket', 'Rusty', 'Wyatt'];
```

### 객체 리터럴과 스프레드 구문

객체에 있는 특성을 복사해서 새로운 객체를 만든다.  
객체 여러 개를 한 객체로 묶을 수도 있고, 기존의 객체를 이용해서 객체를 새롭게 만들 수 있고, 객체를 복사하고 수정할 수도 있다.

```js
const feline = { legs: 4, family: 'Felidae'};
const canine = { isFurry: true, family: 'Caninae' };

// 특성을 추가할 수도 있다.
{...feline, color: 'black'}
// { legs: 4, family: 'Felidae', color: 'black'};

const catDog = {...feline, ...canine};
// { legs: 4, family: 'Caninae', isFurry: true};
const catDog = {...canine, ...feline};
// { isFurry: true, family: "Felidae", legs: 4};

// feline 과 canine 을 합치면 family 특성이 충돌한다.
// 이럴 경우 feline을 먼저 선언하면 나중에 선언된 canine의 family 로 덮어씌어진다.
```

## 나머지 매개 변수 (Rest 매개 변수)

나머지 매개 변수도 ... 키워드를 사용하기 때문에 스프레드 구문과 비슷해 보이지만 완전히 다르다.  
나머지 매개변수를 이해하려면 인수 객체에 대해서 알아야 한다.  
지금까지 함수를 만들 때 인수 객체라는 값이 함수로 전달됐다.  
인수 객체는 배열과 비슷해 보여서 유사 배열 객체라고 부른다.  
요소에 접근하려면 인덱스를 사용해야 하고, 배열처럼 작동하는 것 같지만 배열 메서드를 사용할 수는 없다.  
인수 객체는 함수로 전달된 인수를 모두 가지고 있다.

```js
function sum(...nums) {
  return nums.reduce((total, el) => total + el);
}
// 나머지 매개변수를 사용해서 인수를 사용하면 인수를 배열로 반환하기 때문에 reduce 메서드를 사용할 수 있다.

sum(1, 2, 3); // 6;
sum(10, 11, 12, 13, 14); // 60;

// 예제
function raceResults(gold, silver, ...everyoneElse) {
  console.log(`GOLD MEDAL GOES TO: ${gold}`);
  console.log(`SILVER MEDAL GOES TO: ${silver}`);
  console.log(`AND THANKS TO EVERYONE ELSE: ${everyoneElse}`);
}

raceResults("Tammy", "Todd", "Tina", "Trevor", "Travis");
// GOLD MEDAL GOES TO: Tammy
// SILVER MEDAL GOES TO: Todd
// AND THANKS TO EVERYONE ELSE: Tina, Trevor, Travis
```

인수 객체는 화살표 함수에서 사용할 수 없다. 그렇기 때문에 나머지 매개변수가 필요하다. 나머지 매개변수는 스프레드 구문처럼 펼치지 않고, 매개변수들을 모은다.

## 구조 분해 할당

### 배열 분해

```js
const scores = [929321, 899321, 888336, 772739, 543671, 243567, 111934];

const [gold, silver, ...everyoneElse] = scores;
// gold; 929321;
// silver; 899321;
// everyoneElse; [888336, 772739, ...];
```

### 객체 분해

```js
const user = {
  email: "harvey@gmail.com",
  password: "sCoTt1948sMiTh",
  firstName: "Harvey",
  lastName: "Milk",
  born: 1930,
  died: 1978,
  city: "San Francisco",
  state: "California",
};

const user2 = {
  email: "Stacy@gmail.com",
  firstName: "Stacy",
  lastName: "Gonzalez",
  born: 1987,
  city: "Tulsa",
  state: "Oklahoma",
};

// 기존의 값을 출력할 때
const firstName = user.firstName;
// firstName;   Harvey;
const lastName = user.lastName;
// lastName;    Milk;

// 객체 분해를 이용해 값을 출력할 때
const { email, firstName, lastName, city } = user;
// email;   harvey@gamil.com;
// city;    San Francisco;

// 분해 할당을 이용한 수정
const { born: birthYear, died: deathYear } = user;
// born;    Reference Error;
// birthYear;   1930;

// 디폴트 값 추가
const { city, state, died = "N/A" } = user2;
// died;    N/A;
// user2에는 died라는 특성이 없어서 디폴트 값 없이 호출하면 undefined가 나온다. 디폴트 값을 넣으면 기존 객체에 없는 특성이어도 대입한 디폴트 값이 출력된다.
```

### 매개변수 분해

```js
function fullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
// fullName(user);  "Harvey Milk"

const movies = [
  {
    title: "Amadeus",
    score: 99,
    year: 1984,
  },
  {
    title: "Sharknado",
    score: 35,
    year: 2013,
  },
  {
    title: "13 Going On 30",
    score: 70,
    year: 2004,
  },
  {
    title: "Stand By Me",
    score: 85,
    year: 1986,
  },
  {
    title: "Waterworld",
    score: 62,
    year: 1995,
  },
  {
    title: "Parasite",
    score: 95,
    year: 2019,
  },
  {
    title: "Notting Hill",
    score: 77,
    year: 1999,
  },
];

// 매개변수 분해 안 했을 경우
// movies.filter((movie) => movie.score >= 90)
// 매개변수 분해 했을 경우
// movies.filter(({ score }) => score >= 90)

// 매개변수 분해 안 했을 경우
// movies.map(movie => {
//    return `${movie.title} (${movie.year}) is rated ${movie.score}`
// })

// 매개변수 분해 했을 경우
movies.map(({ title, score, year }) => {
  return `${title} (${year}) is rated ${score}`;
});
```

객체 분해와 똑같이 디폴트 값도 줄 수 있다.
