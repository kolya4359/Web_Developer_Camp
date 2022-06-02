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
Schema에 설정하지 않은 color: red 라는 특성을 추가해도 데이터베이스에 저장되지 않는다. Schema에 없는 특성은 무시된다.

### 추가 스키마 제약조건

스키마 타입을 설정할 때도 다양한 옵션들을 설정할 수 있다.

```js
onSale: {
  type: Boolean,
  default: false
} // onSale의 타입을 설정하지 않으면 기본값으로 false가 나온다.

name: {
  type: String,
  required: true,
  maxlength: 20
} // name의 문자열 최대 길이를 20으로 제한한다.

price: {
  type: Number,
  required: true,
  min: 0
} // price의 최솟값을 0으로 제한한다.

categories: [String]
// 문자열로만 이루어진 배열이 된다.

qty: {
  online: {
    type: Number,
    default: 0,
  },
  inStore: {
    type: Number,
    default: 0,
  },
} // 객체로 지정하고, 객체마다 타입을 따로따로 설정할 수 있다.
```

## Mongoose 업데이트 유효성 검사하기

스키마 타입 설정에서 price의 최솟값을 0으로 설정해도 업데이트 할 때 음수를 넣어도 에러가 안 나온다. 그래서 업데이트를 할 때 세 번째 인자 옵션으로 runValidators: true를 해줘야 업데이트 할 때도 유효성 검사를 한다.

### Mongoose 유효성 검사 오류

String 타입의 enum이라는 특성은 배열로 이루어진 문자열을 설정하고, 새로 만들어진 집합의 특성이 enum 값 중에 있는 지 확인한다.

```js
size: {
  type: String,
  enum: ['S', 'M', 'L']
}
// 사이즈의 값이 S, M, L 중에 하나가 아니면 에러가 나온다.
```

## 인스턴스 메서드

> Schema인스턴스이름.methods.메서드이름 = function () {  
>  실행부  
> }

형식으로 인스턴스 메서드를 만들어서 사용할 수 있다.

```js
// 화살표 함수가 아닌 기존의 함수 표현식을 사용해야 한다. 함수의 값이 변하기 때문이다.
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Bike Helmet" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
};
```

## 정적 메서드 추가하기

인스턴스가 아닌 모델 자체에 적용되는 정적 메소드를 추가할 수도 있다.
인스턴스 메서드에서의 this는 개별 인스턴스를 가리키지만, 정적 메서드의 this는 모델 클래스 자체를 가리킨다.  
모델의 정적 메서드는 항목을 찾거나 업데이트하거나 생성하고 또 삭제할 수 있는 더 편하고 유용한 방식이다.

## 가상 Mongoose

가상 프로퍼티는 말 그대로 실제로 데이터베이스에 저장되지 않고 가상으로 띄우는 프로퍼티라는 의미로 몽구스 스키마에 다음과 같이 정의할 수 있다. 실제로 데이터베이스에 저장되지 않는 데이터가 왜 필요할까?  
예를 들어 스키마에 거리에 대한 프로퍼티 distance가 필요하다고 생각해보자. 서비스가 글로벌하게 성장하여 외국에 진출을 해야 하는데 어떤 나라는 거리를 킬로미터가 아니라 마일을 사용할 수도 있다. 이때는 같은 데이터를 나타내는 킬로미터와 마일을 모두 데이터베이스에 저장하면 자원이 낭비된다고 볼 수 있다.  
이와 같은 경우에 실제 거리에 대한 데이터는 킬로미터로 저장하고 특정 클라이언트에는 가상으로 마일 데이터를 생성하여 보여줄 수 있다. 물론 어플리케이션 로직에서 이를 처리할 수 있지만 몽구스 가상 프로퍼티 기능을 사용하여 구현할 수도 있다.

```js
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  // this는 각 개별 도큐먼트를 의미한다.
  return this.duration / 7;
});
```

위에서 몽구스 스키마 인스턴스를 생성하는 생성자의 두 번째 인자로 전달된 객체는 데이터베이스를 쿼리한 결과물인 데이터가 JSON과 객체 형태로 내보내질 때 가상 프로퍼티도 함께 내보내라는 의미이다. 따라서 이 옵션을 설정하지 않으면 가상 프로퍼티는 쿼리 결과물에 포함되지 않는다.

```js
{
  toJSON: { virtuals: true },
  toObject: { virtuals: ture }
}
```

위와 같이 가상 프로퍼티를 설정 후 쿼리 요청을 보내면 durationWeeks가 가상으로 계산되어 결과물에 포함되었다.

```js
{
  "status": "success",
  "dta": {
    "tours": [
      {
        "_id": "5df4dcbfe5ad9f25e2b4aace",
        "name": "The Sports Lover",
        "duration": 14,
        "price": 2997,
        "durationWeeks": 2
      }
    ]
  }
}
```

## Mongoose를 미들웨어로 정의하기

## mongosse 명령어

- mongo : mongo shell 창으로 전환.
- show dbs : mongoDB에 있는 DB들을 보여줌.
- use [DB이름] : 해당 DB를 실행.
- show collections : DB가 가지고 있는 collection을 보여줌.
- db.[collection이름].find() : 해당 컬렉션의 들어있는 객체들을 보여줌.
