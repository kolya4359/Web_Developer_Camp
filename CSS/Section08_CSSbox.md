# Section 8 : CSS 박스 모델

## 박스 모델: 가로와 세로

CSS 레이아웃은 박스 형태로 나타난다. 텍스트 같은 요소들도 박스 형태로 구역이 나뉘어져 있다. 그래서 이 박스를 이용해서 구역을 나누고 콘텐츠를 정한다.  
박스의 크기는 CSS 속성으로 바꿀 수 있고, 배치도 바꿀 수 있다.

```css
div {
  width: 100px; /* 가로값 */
  height: 200px; /* 세로값 */
}
```

## 박스 모델: 테두리와 모깍기

테두리의 굵기, 색상, 형태를 바꿀 수 있다.  
radius 속성을 이용해서 모깍기를 할 수도 있다.

## 박스 모델: 패딩

padding은 박스 안쪽의 공백 영역을 말한다. 테두리와 콘텐츠 사이의 빈 공간이다.

```css
button {
  padding: 20px;
  /* 상단, 우측, 하단, 좌측 전부 20px */
  padding: 0 20px;
  /* 상단, 하단은 0, 우측, 좌측은 20px */
  padding: 0 10px 20px 30px;
  /* 상단, 우측, 하단, 좌측 순으로 패딩을 넣는다. */
  padding-top: 0;
  padding-right: 10px;
  padding-bottom: 20px;
  padding-left: 30px;
}
```

## 박스 모델: 여백 (margin)

margin은 박스 바깥쪽의 공백 영역을 말한다. 테두리 바깥쪽이다.
사용법은 padding과 동일하다.

## 디스플레이 속성

디스플레이 속성을 사용하면 블록 요소를 인라인 속성으로 바꿀 수 있고, 인라인 요소를 블록 속성으로 바꿀 수 있다.  
인라인 요소는 박스 크기를 바꿔도 영향을 받지 않지만 패딩이나 여백을 키우면 박스 크기가 커진다. 하지만 인라인 속성이라 다른 요소들을 밀어내지 않고 겹쳐서 보이게 된다. 인라인 요소는 크기를 아무리 키워도 자신이 포함된 상위 요소의 범위를 벗어나지 않는다.  
블록 요소는 width와 height로 크기를 수정하면 반영된다.  
inline-block 속성은 인라인처럼 공간을 공유하지만 width와 height에 박스의 크기가 변경된다.

## CSS의 단위

### 상대 단위

부모 요소의 크기에 따라 상대적으로 크기가 변한다.

- EM : 부모 요소의 특성 크기에 비례해서 크기가 변함
  - 1em = 부모 요소와 크기가 같음. 2em = 부모 요소 크기의 2배.
  - 단계별로 크기가 한없이 커지거나 작아진다는 단점이 있다.
  - 부모의 크기가 1이고 자식의 em이 0.5고 그 자식의 크기가 0.5면 자식은 부모의 0.25 크기가 된다.
- REM : root EM. 부모의 크기와 상관없이 루트 HTML 요소의 크기에 따라 바뀐다.
  - 루트 HTML의 1rem이면 다른 요소에 0.8rem을 적용하면 중첩이나 위치에 상관 없이 0.8rem 이 된다.
- VH
- VW
- %

### 절대 단위

- PX : 픽셀. 가장 많이 쓰인다.
- PT
- CM
- IN
- MM
