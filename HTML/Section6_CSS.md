# Section6 : CSS: 기초

## CSS (Cascading Style Sheets)

Cascading Style Sheets는 HTML이나 XML 로 작성된 문서의 표시 방법을 기술하기 위한 스타일 시트 언어이다.

### CSS 작성법

```css
selector {
  property: value;
}

h1 {
  color: purple;
}
```

### CSS 작성 스타일

1. Inline Style Sheet : HTML 태그의 style 속성에 CSS코드를 넣는 방법.
2. Interanl Style Sheet : HTML 문서 안의 style과 /style 안에 CSS 코드를 넣는 방법.
3. Linking Style Sheet : 별도의 CSS 파일을 만들고 HTML 문서와 연결하는 방법.

### 세미클론

특성 선언을 마치고 다음 특성으로 넘어간다는 뜻이다.

### 폰트 크기

- px : 절대 단위
- em, rem, % : 상대 단위
