# Section32 : 모듈과 NPM

## Module.exports 사용하기

```js
// math.js
const add = (x, y) => x + y;
const PI = 3.14159;
const square = (x) => x * x;

// module.exports 메서드를 사용해서 함수나 변수들을 내보내줘야 다른 파일에서 사용할 수 있다.
module.exports.square = square;
module.exports.PI = PI;
module.exports.add = add;
// ------------------------------------------------
// const math = {
//   add: add,
//   PI: PI,
//   square: square
// }
// module.exports = math;
// ------------------------------------------------
// module.exports.add = (x, y) => x + y;
// module.exports.Pi = 3.14159;
// module.exports.square = x => x * y;
// ------------------------------------------------
// exports.square = square;
// exports.PI = PI;
// // 이 경우엔 exports = "sfskglkn"; 이런 식으로 값을 변경할 수 없다.
```

```js
// app.js
const math = require("./math");
// require 키워드를 이용해서 모듈이나 파일을 불러온다.
// 파일을 불러올 때는 상대경로를 입력해줘야 파일을 찾아서 불러온다.
// math라는 변수에 math라는 파일을 불러와서 저장한 후 사용한다.
```

## 디렉토리의 중요성

index.js 파일은 해당 디렉토리의 메인 파일이다.  
그래서 디렉토리 외부에서 디렉토리를 불러오는 경우엔 불러올 디렉토리의 index.js 파일을 불러오게 된다.

## NPM 개요

npm은 Node Packaged Manager의 약자이다.  
Node.js로 만들어진 pakage(module)을 관리해주는 툴이라는 뜻이다.  
프로그램보다 작은 단위인 모듈들을 필요에 따라서 활용할 수 있게 해준다. 또한, 활용한 모듈을 만든 개발자가 업데이트를 할 때 체크를 해서 알려주기 때문에 버전관리도 쉬워진다.
쉽게 말해 패키지는 다른 사람이 쓴 코드인데 보통은 우리가 가져다 자체 프로젝트에 통합시킬 수 있도록 쓰여진 코드이다.  
NPM은 그런 노드 패키지를 위한 표준화된 저장소로 NPM 명령줄 도구와 같이 제공되어서 손쉽게 이 패키지들을 설치하고 관리할 수 있게 해준다.

## 패키지 설치

npm i 패키지명 을 명령줄에 입력하면 패키지가 설치된다.  
npm i -g 패키지명 을 명령줄에 입력하면 전역 설치 할 수 있다.  
(-g는 -global의 줄임말이다.)

## package.json의 중요성

package.json은 프로젝트의 정보를 정의하고, 의존하는 패키지 버전 정보를 명시하는 파일이다.  
일반적으로 루트 디렉토리에 위치하고 작성되는 정보를 크게 2개로 나눌 수 있다.

- 프로젝트의 정보 : name, version 영역
- 패키지 버전 정보 : dependencies 또는 devDependencies 영역

### 프로젝트 정보

package.json 파일은 반드시 name과 version 항목을 포함해야 한다.  
name : 소문자 한 단어로 이루어져야한다. 그리고 하이픈(-)과 언더스코어(\_)가 포함될 수 있다.  
version: x.x.x 형식을 따라야 하며, 작성 규칙을 시맨틱 버저닝이라고 한다.

### 패키지 정보

패키지 정보는 dependencies 또는 devDependencies에 작성된다.  
dependencies와 devDependencies의 차이는 다음과 같다.

- dependeencies: 프로덕션 환경에서 응용 프로그램에 필요한 패키지
- devDependencies: 로컬 개발 및 테스트에만 필요한 패키지

## 패키지와 모듈

### 패키지

패키지는 package.json으로 설명되는 파일 또는 디렉토리 이다.  
패키지는 npm 레지스트리에 공개되기 위해 반드시 package.json 파일을 가지고 있어야한다.

### 모듈

모듈은 node.js의 require()함수로 로드될 수 있는 node_modules 디렉토리 안의 파일 또는 디렉토리이다.  
주의: 모듈은 package.json 파일을 가질 필요가 없다. 모든 모듈들이 패키지는 아니다. package.json을 가진 모듈만이 패키지이다.  
모듈이 패키지 보다 조금 더 큰 개념.

## 한 프로젝트에 대한 모든 종속 요소

프로젝트를 공유할 때 node_modules 디렉토리는 공유하지 않는다.  
package.json에 dependencies를 기반으로 모듈들을 설치한다.  
npm install 명령어를 사용하면 알아서 package.json을 살펴보고 디펜던시를 찾아서 내려받고 node_modules 디렉토리를 만들어서 필요한 내용을 집어넣는다.
