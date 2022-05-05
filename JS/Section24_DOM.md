# DOM이란?

## DOM의 개요

DOM은 문서 객체 모델(Document Object Model)을 말한다.  
웹 페이지를 구성하는 JavaScript 객체들의 집합이다.

## getElementById

이 메서드에 문자열을 전달하면 일치하는 ID를 가진 요소를 찾아 나타낸다.  
JavaScript에게 일치하는 ID를 가진 요소를 찾아서 객체로 가져오라는 하는 것이다.  
ID를 선택할 때만 작용하고 클래스 이름으로는 작용하지 않는다.

```js
document.getElementById("chicken");
// null
// chicken 이라는 ID 가 없으면 null을 반환한다.

document.getElementById("banner");
// banner라는 ID를 가진 이미지 태그가 반한된다.
```

## getElementsByTagName & ClassName

getElementById와 비슷하지만 이 클래스에 해당하는 모든 요소를 찾는다거나 앵커 태그나 이미지 태그인 모든 요소를 찾는다. 그래서 복수형인 Elements를 사용한다.  
문단에 해당하는 요소 이름인 paragraph단어를 전달하지 않고 p 또는 img를 전달하면 HTMLCollection을 반환한다.  
HTMLCollection은 배열이 아니기 때문에 배열 메서드를 사용할 수 없다.  
해당하는 값이 없으면 null 이 나오지 않고 빈 집합이 나온다.

### getElementsByTagName

getElementsByTagName은 문자열로 받은 이름을 가진 TagName을 모두 찾는다.

```js
const allImages = document.getElementsByTagName("img");
// 본문 예제에서는 4개의 이미지가 HTMLCollection으로 반환된다.

for (let img of allImages) {
  img.src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg";
}
// for...of 문을 사용해서 4개의 이미지 객체의 src를 위의 url로 수정할 수 있다.
```

HTMLCollection의 각 요소는 Element라고 불리는 특정한 항목이다.  
JavaScript에서 Element는 반환되는 객체에 해당하는데 하나의 HTML 요소를 나타내는 모든 특성을 지닌 객체이다.

### getElementsByClassName

getElementsByTagName 과 비슷하게 작동한다. 다른 점은 ClassName을 찾을 수 있다는 점이다.

## querySelector

최근에 나온 선택자이다.  
ID, 클래스이름, 요소 타입, 속성, CSS스타일이든 원하는 선택자를 무엇이든 이용해서 사용할 수 있다.  
일치하는 첫 번째 요소를 반환한다.

> document.querySelector('p');  
> 가장 먼저 일치하는 p문단이 나온다.

## querySelectorAll

querySelector와 똑같은 원리인데 일치하는 첫 번째 요소 대신에 모든 요소를 반환한다.

> document.querySelectorAll('p');

## innerHTML, textContent & innerText

node나 elemetn의 텍스트값을 읽어오고 설정할 수 있다.

### innerText

'Element'의 속성으로, 해당 Element 내에서 사용자에게 '보여지는' 텍스트 값을 읽어온다.

- ex) 안녕하세요? 만나서 반가워요

```js
document.querySelector("p").innerText;
// "The Silkie (sometimes spelled Silky) is a brre of ...
// p 문단의 Text가 반환된다.
ducument.querySelector("p").innerText = "lolololol";
// p문단의 Text를 "lolololol" 로 수정한다.
```

### textContent

'Node'의 속성으로, innerText와 달리 script나 style 태그와 상관없이 해당 노드가 가지고 있는 텍스트 값을 그대로 읽는다.

- ex) 안녕하세요? 만나서 반가워요. 숨겨진 텍스트

### innerHTML

'Element'의 속성으로, 해당 Element의 HTML, XML을 읽어오거나, 설정할 수 있다.  
해당 요소의 있는 HTML 전체 내용을 가져올 수 있다.  
특정 요소에 포함된 마크업의 전체 내용을 출력한다.

- ex) 안녕하세요? 만나서 반가워요 span style="displayt:none">숨겨진 텍스트/span>

## 속성 (Attributes)

img id="banner" src="..."  
여기서 id나 src를 요소의 속성이라고 한다.  
document.querySelector('img').id = "banana"  
이런 식으로 직접 속성의 값을 변경할 수 있다.

### getAttribute

getAttribute를 사용하면 HTML 자체에서 직접 가져온다.

```js
const firstLink = document.querySelector("a");
first.href;
// "file://wiki/List_of_chicken_breeds"
firstLink.getAttribute("href");
// "/wiki/List_of_chicken_breeds"
```

직접 액세스 한 것이랑 getAttribute로 액세스 한 것이 비슷하긴 하지만 약간의 차이가 존재하고 그에 따라 값이 다르게 나온다.

### setAttribute

setAttribute를 사용하면 속성의 값을 수정할 수 있다.

## 스타일 변경하기

JavaScript에서 CSS는 카멜케이스로 작성한다.

### 직접 요소에 접근하기

```js
h1.style.color = "green";
h1.style.fontSize = "3em";
h1.style.border = "2px solid pink";
```

이렇게 하면 h1의 스타일들이 바뀌게 된다. 하지만 선호하는 방식은 아니다. 한 가지만 작업할 때는 쉽지만 많은 스타일을 적용해야 할 땐 불편하다. 두 번째로, 인라인 스타일을 많이 변경하는 것은 효과적이지 않다. 인라인 스타일은 아주 구체적이고 특정하게 적용되어 스타일을 인라인으로 쓰는 건 피해야 한다.

### getComputedStyle

여러가지 작업을 한 후에 해당 요소에 내가 지정한 속성값을 찾고 싶을 때 사용한다. 전달된 요소의 특성을 찾아 값을 찾을 수 있다.

> window.getComputedStyle(h1).fontSize  
> "32px"

window.getComputedStyle(h1) 으로 치면 객체와 같은 형태를 반환하는데 객체는 아니고 CSSStyleDeclaration이라고 한다.

### CSS 클래스를 사용하기

클래스를 추가하는 두 가지 방법.

- setAttribute를 사용한다.

```js
const h2 = document.querySelector("h2");
h2.getAttribute("class");
// undefined
h2.setAttribute("class", "purple");
// class이름이 purple로 수정되었다.
```

### classList

요소의 클래스를 제어하고 검색하고 조작도 하기 위해 호출되는 객체

```js
const h2 = document.querySelector("h2");
h2.classList;
// DOMTokenList [value: ""]
h2.classList.add("purple");
h2.classList.remove("purple");
h2.classList.contains("purple");
// false
// contains : class에 purple이 있는지 확인하는 메서드
```

## 새 요소 자체를 만드는 법

### createElement

만들고 싶은 요소의 타입을 전달하면 된다.

```js
const newImg = document.createElement("img");
// <img>
newImg.src = "https://images.unsplash.com/...";
// 이미지의 출처를 넣어준다.
// img 요소를 만들고 출처를 넣어줘도 페이지에 표시되진 않는다.
```

### appendChild

요소가 추가될 장소를 선택할 수 있다.

```js
document.body.appendChild(newImg);
// newImg를 body에 넣어준다.

const newH3 = document.createElement("h3");
newH3.innerText = "I am new!";
document.body.appendChild(newH3);
```

## append

요소를 선택해서 만들고 text를 손쉽게 넣을 수 있다.

```js
const p = document.querySelector("p");
p.append("i am new text yaaaaaayyy!!!");
// p 문단의 마지막에 i am new text yaaayyy!!! 라는 text가 추가된다.
p.appendChild("i am new text yaaahhh!!!");
// Uncaught TypeError: Failed to execute 'appendChild' on Node
// appendChild를 사용하면 노드가 아니고 문자열이라서 사용할 수 없다는 에러가 나온다

p.append("i am new text yaahhh!!!", "aldjfhoidhg");
// 하나 이상의 작업이 가능하다.

// 요소의 앞에 추가하는 법
const newB = document.createElement("b");
newB.append("Hi!");
p.prepend(newB);
// p 문단의 맨 앞에 newB가 추가된다.

// 요소 중간에 추가하는 법
const h2 = document.createElement("h2");
h2.append("Are adorable chickens");
const h1 = document.querySelector("h1");
h1.insertAdjacentElement("afterend", h2);
// h1의 뒤에 h2를 추가한다.
```

### 대상 요소의 앞이나 뒤에 추가할 때 사용하는 키워드

- beforebegin : Before the targetElement itself.
- afterbegin : Just inside the targetElement, before its first child
- beforeeend : Just inside the targetElement, after its last child
- afterend : After the targetElement itself

### after 메서드

요소를 다른 요소 다음에 삽입한다.

```js
const h3 = document.createElement("h3");
h3.innerText = "I am h3";
h1.after(h3);
// h1 요소 뒤에 h3 요소가 추가된다.
```

### before 메서드

요소를 다른 요소 이전에 삽입한다.

## 요소를 제거하는 법

### removeChild

자식요소를 제거할 수 있다.

```js
const firstLi = document.querySelector("li");
const ul = firstLi.parentElement;
// 부모 요소를 찾는다.
ul.removeChild(firstLi);

// 한 줄로 작성 가능하다.
b.parentElement.removeChild(b);
// b 요소의 부모 요소를 찾고 그 자식인 b 요소를 제거한다.
```

### remove

최근에 나온 메서드로 요소를 바로 삭제한다.

```js
const img = document.querySelector("img");
img.remove();
img.parentElement.removeChild(img);
```
