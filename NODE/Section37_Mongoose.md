# Section37: Mongoose로 MongoDB에 접속하기

### (예제 : 37_Mongoose)

## Mongoose란

- MongoDB ODM 중 가장 유명한 라이브러리이다.
  - ODM: Object Document Mapping의 약자이다. 객체와 문서를 1대 1로 매칭해준다. 즉, MongoDB에 있는 데이터를 NodeJS에서 JavaScript 객체로 사용할 수 있도록 해준다.
- 데이터베이스 연결, 스키마 정의, 스키마에서 모델로 변환, 모델을 이용해 데이터를 다룸.
- 프로미스와 콜백 사용가능

## Schema

Mongo의 각기 다른 키 집합을 JavaScript의 다른 타입으로 구조를 짜는 것을 말한다.

```js
// example
{
  title: 'Amadeus',
  year: 1986,
  score: 9.2,
  rating: 'R'
}
// 스키마는 키값의 타입을 지정해주는 것.
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String
})
// 스키마를 이용한 모델을 만든다.
// 첫 번째 인자는 모델 이름을 나타내는 문자열을 입력한 후, 두 번째 인자로 스키마를 입력한다.
// 모델 이름은 단수형이면서 첫 번째 문자는 대문자로 작성해야 한다.
// 그러면 MongoDB에 movies라는 집합이 생성된다. 자동으로 복수형으로 바뀌고 소문자로 바뀐다.
const Movie = mongoose.model('Movie', movieSchema)
const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'})

// 여기까지 작성하면 JavaScript에는 amadeus라는 Movie의 인스턴스가 생성된다. 하지만 MongoDB에서 movies 집합을 찾아보면 안이 비어있다.
amadeus.save();
// save() 메서드를 사용해야 MongoDB에도 집합이 저장된다.

amadeus.score = 9.5;
// JavaScript 객체는 score가 9.5로 바뀌지만 MongoDB 안에 score는 여전히 9.2 이다.

amadeus.save();
// 이제 MongoDB 안에 score도 9.5로 바뀐다.
```

### 대량 삽입하기

하나씩 만들어서 save()메서드로 저장하는 방법도 있지만, 한 번에 여러 개의 객체를 저장하는 방법도 있다.  
inserMany([{}]) 를 사용하면 한 번에 배열 안의 객체들이 모두 저장된다.

### Mongoose로 찾기

```js
// Movie의 모든 객체 찾기
Movie.find({}).then((data) => console.log(data));

// Movie의 rating이 PG-13인 객체 찾기
Movie.find({ rating: "PG-13" }).then((data) => console.log(data));

// Movie의 year이 2015 이상인 객체 찾기
Movie.find({ year: { $gte: 2015 } }).then((data) => console.log(data));
```

find() 메서드는 하나 또는 여러 개의 데이터를 찾을 수 있다. 데이터를 하나만 찾을 땐 findOne() 메서드를 사용할 수도 있는데, 두 메서드의 차이점은 find() 메서드는 하나를 찾더라도 배열을 반환한다. findOne() 메서드는 객체를 반환한다.

```js
// findById
Movie.findById("5f3e0c2d838e3725b55202c7").then((m) => console.log(m));
// 객체가 갖고 있는 고유한 ID를 이용해서 데이터를 찾는 방법이다.
```

### Mongoose로 업데이트하기

Mongoose의 업데이트는 Mongo 업데이트처럼 updateOne() 이나 updateMany()를 사용한다. 하지만 이 메서드들은 업데이트를 시켜주지만, 업데이트 결과를 알려주진 않는다. 그래서 findByIdAndUpdate() 나 findOneAndUpdate()를 사용한다.

```js
// findOneAndUpdate 예시 : 일치하는 게 둘 이상이라도 첫 번째 영화만 갱신된다.
Movie.findOneAndUpdate(
  { title: "The Iron Giant" },
  { score: 7.0 },
  { new: true }
).then((m) => console.log(m));
// 세 번째 인자로 옵션값 new를 넣어준다. new의 기본값은 false인데 new의 값이 false인 경우엔 갱신되기 전의 데이터가 출력된다. 갱신된 후의 데이터를 출력하고 싶을 땐 new: true를 입력해야 한다.
```

### Mongoose로 삭제하기

Mongoose의 삭제도 Mongo의 삭제와 같다. 하지만 deleteOne()이나 deleteMany() 역시 삭제 결과를 알려주진 않는다. 그래서 findByIdAndDelete() 나 findOneAndDelete()를 사용한다.

## Mongoose 스키마 유효성 검사

Schema를 생성할 때 required 라는 특성을 추가할 수 있다.  
required: true 로 설정하면 모델을 생성할 때 해당 키-값은 반드시 입력되어야 한다. 비어 있는 경우 에러가 나온다.  
name: String으로 지정하고 숫자를 입력해도 에러가 나온다.
