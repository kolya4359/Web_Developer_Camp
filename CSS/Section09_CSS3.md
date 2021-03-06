# Section9 : 유용한 CSS 속성들

## 불투명도와 알파 채널

알파 채널(alpha channel)이란 색상의 투명도를 나타내는 채널이다.  
색을 정하는 속성 중에 rgba 속성이 있는데 색의 삼 원색(255, 255, 255)으로 색을 정하고 그 뒤에 투명도를 0~1 로 설정할 수 있다. (255, 255, 255, 0.7)  
투명도 속성에서 1은 불투명하다는 뜻이고, 0은 투명하다는 뜻이다.  
색 말고 요소에도 투명도를 설정해 줄 수 있다.  
opacity 라는 특성을 사용한다. 부모 요소에 투명도를 설정하면 자식 요소도 같이 투명해진다.  
알파 채널은 16진법으로 색을 설정하는 hex에서도 사용할 수 있다. rgba는 설정해준 요소만 투명도를 바꾸는데 비해 hex는 다른 색상값에도 투명도가 적용된다.

## 위치 속성

문서 내에서 요소의 위치를 설정하는 속성이다.  
position 속성을 사용해서 위치를 설정하는데 기본값은 static이다. static일 땐 크기에 변화를 줘도 변하지 않는다.  
relative 속성값은 원래 위치에서 위칫값을 준 만큼 이동한다. 위칫값은 top, bottom, right, left 키워드로 조절한다.  
absolute 속성값은 요소가 일반적인 흐름에서는 제거되지만 가장 가까이 있는 조상이 있다면 해당 조상을 기준으로 하거나 가까운 조상이 없다면 초기 컨테이닝 블록, 즉 body 를 기준으로 상대적인 위치에 배치된다.  
fixed 속성값은 그 자리에 계속 유지된다. 배치되는 위치는 항상 컨테이닝 블록에 상대적이지만, 부모 요소 같은 것과는 관계가 없다. 문서 흐름에서 제거되고 공간도 차지아지 않는다. fixed 속성값을 설정하면 스크롤바를 내려도 항상 그 자리에 고정된다. 내비게이션 바처럼 말이다.

```css
#static {
  position: static;
  top: 100px;
} /* 위치 변화가 없다. */

#relative {
  position: relative;
  top: 50px;
  left: 50px;
} /* 현재 위치에서 아래로 50, 오른쪽으로 50 이동했다. */

#absolute {
  position: absolute;
  top: 50px;
  left: 50px;
} /* body(0, 0)를 기준으로 아래로 50, 오른쪽으로 50 이동했다. */
```

## CSS 전환

한 특성값에서 다른 특성값으로 변화할 때 애니메이션 효과를 주는 것이다.
transition 속성을 사용한다.  
변화할 속성, 지연시간, 작동시간, 타이밍을 지정할 수 있다.  
타이밍은 변화하는 방법을 지정할 수 있다.( 천천히, 처음에 천천히 점점 빠르게...)

```css
.circle {
  width: 300px;
  height: 300px;
  background-color: magenta;
  transition: background-color 1s 1s;
  /* 위와 같이 설정하면 배경색만 1초의 지연시간을 두고 1초동안 변한다는 뜻이다. 여러가지 속성에 각각 지연시간과 작동시간을 추가할 수 있다. */
}
/* circle이 magenta 색의 사각형인데 마우스를 올리면 cyan색의 원형으로 바뀐다. transition을 1초로 주었기 때문에 1초동안 변화가 서서히 진행된다. */

.circle:hover {
  background-color: cyan;
  border-radius: 50%;
}
```

## 배경

background-image: 'url' 속성으로 다운받은 이미지를 배경으로 사용할 수 있다. background 속성은 속기법으로 작성할 때 속성의 순서는 상관 없다.  
속기법으로 사용할 때 유의할 점은 background-size 속성값을 작성할 때 위치값 뒤에 크기값을 넣어주어야 한다. (center/cover)

- background-size: 이미지의 크기를 조절할 수 있다.
  - contain은 비율을 유지하며 이미지 잘림 없이 최대한 꽉 차게 표시된다. 이미지가 박스보다 작으면 반복되어 나타난다.
  - cover은 박스 크기에 맞게 이미지가 최대한 나타나지만 박스 크기를 넘어가면 잘린다.
- background-position: 배경의 시작점을 지정해 준다.

## 디자인

여백 같은 경우 상대적으로 계산할 때 margin: 1.6666% 같은 소수점 값이 나올 수도 있다. 이럴 경우 margin: calc(10%/6); 과 같이 계산식을 넣을 수도 있다. 그럼 값이 계산돼서 스타일에 적용된다.  
html 문서에서 인라인 요소를 줄바꿈으로 연결하면 화이트 스페이스라는 빈 공간이 생긴다. 이것이 디자인을 방해하는 요소가 될 수 있으니 주의하자.
