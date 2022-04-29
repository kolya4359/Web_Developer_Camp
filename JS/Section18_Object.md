# Section 18: JavaScript 객체 리터럴(Literals)

## 객체 리터럴의 개요

객체는 키-값 쌍 또는 프로퍼티라는 걸 이용해서 데이터가 저장된다.  
프로퍼티(property)는 두 개의 정보가 모인 것으로 레이블과 같은 키(key)와 값(value)로 구성된다. 이 둘이 쌍(pair)을 이루게 되고 객체는 이 쌍들의 집합이다.

```js
let comment = {
  username: "sillyGoose420",
  downVotes: 19,
  upVotes: 214,
  netScore: 195,
  commentText: "Tastes like chicken lol",
  tags: ["#hilarious", "#funny", "#silly"],
  isGilded: false,
};
```

## 객체 데이터를 불러오는 법

1. 대괄호 안에 키를 따옴표로 감싸서 호출하면 값이 출력된다.

> const person = {firstName: "Mick", lastName: "Jagger"}
> person["lastName"]; // "Jagger"

2. 점 표기법으로 변수.키 형식으로 호출하면 값이 출력된다.

> person.firstName; // "Mick"
> person.lastName; // "Jagger"

- 숫자를 키로 쓸 수도 있지만, 저장 될 때는 모두 문자열로 저장된다.
- 점 구문은 편하게 쓸 수 있어서 좋지만, 변수 같은 유동적인 것을 객체에서 키로 쓰고 싶을 땐 대괄호를 사용해야 한다.

## 객체 데이터를 추가하거나 수정하는 법

```js
// 수정
const midterms = { danielle: 96, thomas: 78 };
midterms.thomas = 90;
midterms; // {danielle: 96, thomas: 90}

// 추가
midterms.ezra = "B+";
midterms; //{danielle: 96, thomas: 90, ezra: B+}
```

## 배열과 객체

객체 안에도 어떠한 값이라도 들어갈 수 있다.

```js
// 배열 안에 객체
const shoppingCart = [
  {
    product: "Jenga Classic",
    price: 6.88,
    quantity: 1,
  },
  {
    product: "Echo Dot",
    price: 29.99,
    quantity: 3,
  },
  {
    product: "Fire Stick",
    price: 39.99,
    quantity: 2,
  },
];

// 객체
const student = {
  firstName: "David",
  lastName: "Jones",
  strengths: ["Music", "Art"],
  exams: {
    midterm: 92,
    final: 88,
  },
};
```
