# 함수란?

## 함수의 개요

코드의 재사용 가능한 일부로서 언제든 사용할 수 있도록 이름을 붙여놓은 것이다.  
코드의 중복을 줄이는 데 무척 유용하고 코드를 더 읽기 쉽고 이해하기 쉽게 해준다.

```js
function funcName() {
  // do something
}

// 간단한 함수 작성
function grumpus() {
  console.log("ugh... you again...");
  console.log("for the last time...");
  console.log("LEAVE ME ALONE!!!");
}

// 함수 실행
grumpus();
// 소괄호( () ) 를 안 붙이면 선언만 하고 실행은 안된다.
// 함수() 로 작성해야 즉시 실행된다.
```

함수 이름은 카멜 케이스로 작성.

## 인수의 개요

전달하는 입력 값.

```js
function greet(person) {
  console.log(`Hi, ${person}!`);
}
// greet 함수에 person 이라는 변수를 입력했다.
// person과 같이 인수로 넣어주는 변수를 매개변수라고 부른다.
```

인수를 두 개 이상 넣어 줄 때는 인수의 순서가 중요하다.

## 함수의 반환

함수를 작성하고 return 키워드를 사용하지 않으면 함수에서 조작한 값이 반환되지 않는다.  
return 키워드는 함수를 종료시키고 값을 반환한다.  
console.log()는 함수에서 조작한 값을 출력할 뿐 반환하진 않는다.  
함수에서 조작한 값을 반환을 해야 값을 사용할 수 있다.

```js
function sum(x, y) {
  return x + y;
} // 반환값은 저장만 되어 있을 뿐 출력되지 않는다.
```
