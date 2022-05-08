# Section10 : 반응형 CSS 및 Flexbox

## Flexbox

페이지의 콘텐츠 상자 안에 아이템을 배치하는 데 사용한다.  
컨테이너를 만들고 그 안에서 공간을 배분하는 것이다.

## Flexbox의 속성

### display

display: flex;  
컨테이너 안의 있는 요소에 Flexbox 속성을 부여한다.

### flex-direction

Flexbox의 요소들의 방향 기본값은 좌-우 이다. (flex-direction: row;)

- flex-direction: row-reverse; : 본 축이 우-좌로 순서가 바뀐다.
- flex-direction: column; : 본 축이 상-하로 바뀐다.
- flex-direction: column-reverse; : 본 축이 하-상으로 바뀐다.

### justify-content

기본값은 justify-content: flex-start 이다.  
Flexbox 안의 요소들이 왼쪽에 배치된다.

- justify-content: flex-end; : 요소들이 오른쪽에 배치된다.
- justify-content: center; : 요소들이 중앙에 배치된다.
- justify-content: space-between; : 바깥쪽 여백을 다 없애고 요소 사이에 간격을 띄운다. 즉, 요소 사이에만 빈 공간이 생기고 요소와 컨테이너 사이에는 빈 곳이 없어진다.
- justify-content: space-around; : 요소의 둘레에 똑같은 면적의 여백을 부여한다.
- justify-content: space-evenly; : 요소 사이, 요소와 컨테이너 사이에도 동일한 크기의 여백을 주는 방법이다.

justify-content 는 direction 값에 따라 결과값이 달라진다.

### flex-wrap

주축이 수평일 때 새로운 행을 만들어 요소를 정렬하고 주축이 수직일 때 새로운 열을 만들어 요소를 정렬하는 속성이다.

- flex-wrap: wrap;
- flex-wrap: wrap-reverse;
- flex-wrap: nowrap;

### align-items

교차축을 따라 아이템을 배열한다.  
교차축은 기본적으로 위에서 아래로 향한다. 교차축의 시작점이 위에 있다는 것이다. 이를 기준으로 아이템을 정렬한다.

- align-items: flex-start; : 기본값
- align-items: flex-end;
- align-items: center; : 수직과 수평이 한 번에 중앙 정렬하고 싶을 때 사용한다.
- align-items: baseline; : 요소에 텍스트가 있을 경우 텍스트의 기준선에 맞춰 정렬한다.

### align-content

행이나 열이 여러 개일 때 교차축을 기준으로 정렬한다.  
행이나 열이 단일일때는 적용되지 않는다.

- align-content: center; : 열 간격을 조정한다.

### align-self

align-content와 비슷하지만 단일 요소에 사용하거나 플렉스 컨테이너에서 두 개 요소에 개별로 사용한다. 교차축을 기준으로 배열된 단일 요소의 위치를 바꿀 수 있다.  
플렉스 컨테이너에서 한 요소만 옮길 때 이 방법을 사용한다.

### flex-basis

요소가 배치되기 전에 요소의 최초 크기를 결정한다.  
주축의 방향의 따라 너비가 되기도 하고 높이가 되기도 한다.  
flex-basis: 400px; 라고 설정하면 width: 300px; 로 해도 400px로 크기가 설정된다. 초기값이 400px이기 때문이다.

### flex-grow

공간이 있을 때 요소가 그 공간을 얼마나 차지할지 정한다.  
flex-grow: 1; 처럼 요소들에 숫자를 부여해 공간을 비율로 나눠서 정렬한다.

```css
nth-of-type(1) {
  flex-grow: 1;
}
nth-of-type(5) {
  flex-grow: 2;
}
```

이렇게 설정하면 2,3,4 번째 요소들은 정해준 크기로 나타나고 남은 공간을 첫 번째와 다섯 번째가 차지하는데 다섯 번째 요소가 첫 번째 요소보다 2배 더 커진다.  
항상 커지는건 아니고 남은 공간이 있을 경우에 적용된다.

### flex-shrink

컨테이너에 충분한 공간이 없을 때 요소들이 줄어드는 비율을 통제한다.

## 반응형 디자인 및 미디어 쿼리 개요

반응형 디자인이라는 것은 다양한 화면 크기와 기기의 특징에 따라 다르게 반응하도록 웹사이트나 애플리케이션을 제작하는 작업이다.

```css
@media (max-width: 800px) {
  .sidebar {
    display: none;
  }
  .main {
    width: 80%;
  }
}
@media (min-width: 30em) and (orientation: landscape) {
  #container {
    flex-direction: column;
    justify-content: center;
  }
}
```

@media 키워드를 이용해 반응형 디자인을 만들 수 있다. @media 다음에 소괄호에 화면 크기에 대한 조건을 적어주고 그 조건이 true 일 때 중괄호 안의 스타일이 적용된다.
