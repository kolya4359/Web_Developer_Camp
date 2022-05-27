# Section 44: Mongo와 데이터 연결하기

## Mongo의 관계 개요

mongoDB는 데이터를 관리하는 방식에서 관계형 데이터베이스와 큰 차이가 있으며 그중 가장 대표적인 특징은 다음과 같다.

1. 도큐먼트 데이터베이스

- 도큐먼트는 HTML과 같은 특정 형식의 태그 구조를 의미하며, MongoDB는 JSON(JavaScript Object Notation) 형식으로 데이터를 관리하므로 NoSQL 데이터베이스 중 도큐먼트 데이터베이스로 분류된다. 또한 도큐먼트는 mongoDB가 데이터를 저장하는 최소 단위이기도 한다.]
- 도큐먼트는 필드와 값의 쌍으로 구성되며, 관계를 갖는 데이터를 중첩 도큐먼트와 배열을 사용하여 1개의 도큐먼트로 표현할 수 있다.
- 데이터 입출력 시에는 JSON 형식의 도큐먼트를 사용하나 데이터베이스 저장 시에는 이진 포맷으로 인코딩한 BSON(Binary JSON)형식의 도큐먼트로 변환되어 저장된다.

2. 유연한 스키마

- 스키마의 선언 없이 필드의 추가와 삭제가 자유로운 Schema-less 구조이다.
- 관계형 데이터베이스는 테이블 내 모든 로우(Row)의 칼럼 집합이 동일하고 같은 칼럼은 동일한 데이터 타입을 갖는 정형 스키마이나, mongoDB는 컬렉션 내 모든 도큐먼트들의 필드 집합이 동일하지 않고 같은 필드라도 데이터 타입이 다를 수 있는 비정형 스키마이다.

3. 비 관계형 데이터베이스

- mongoDB는 관계형 데이터베이스의 관계(Relationship) 개념이 없는 비 관계형 데이터베이스이다.
- mongoDB는 조인(join)을 지원하지 않으며, 대신 임베디드 방식의 도큐먼트 구조를 사용하거나 레퍼런스 방식의 도큐먼트 구조를 사용한 후 애플리케이션에서 조인해야 한다.

4. 비 트랜잭션

- mongoDB는 트랜잭션을 지원하지 않고 각각의 도큐먼트 단위로 처리된다.
- 트랜잭션을 지원하지 않으므로 Commit 또는 Rollback 개념이 없으며 모두 Auto Commit으로 처리된다.

## SQL의 관계 개요

1. 관계의 정의

- 상호 연관성이 있는 상태
- "엔티티의 인스턴스 사이의 논리적인 연관성으로서 존재의 형태로서나 행위로서 서로에게 연관성이 부여된 상태"
- 관계는 엔티티와 엔티티 간 연관성을 표현하기 때문에 엔티티의 정의에 따라 영향을 받기도 하고, 속성 정의 및 관계 정의에 따라서도 다양하게 변할 수 있다.

![](./imgs/%EA%B4%80%EA%B3%84%EC%9D%98%20%EC%A0%95%EC%9D%98.png)

2. 관계의 페어링

- 관계는 엔티티 안에 인스턴스가 개별적으로 관계를 가지는 것(페어링)이고 이것의 집합을 관계로 표현한다는 것이다.
- 개별 인스턴스가 각각 다른 종류의 관계를 가지고 있다면 두 엔티티 사이에 두 개 이상의 관계가 형성될 수 있다.
- 각각의 엔티티의 인스턴스들은 자신이 관련된 인스턴스들과 관계의 Occurance로 참여하는 형태를 관계 페어링(Relational Pairing)이라고 한다.
- 밑의 그림에서는 강사인 정성철은 이춘식과 황종하에게 강의를 하는 형태로 관계가 표현되어 있고 조시형은 황종하에게 강의를 하는 형태로 되어 있다.
- 엔티티는 인스턴스의 집합을 논리적으로 표현하였다면 관계는 관계 페어링의 집합을 논리적으로 표현한 것이다.
- 최초의 ERD(Chen 모델)에서 관계는 속성을 가질 수 있었으나 요즘 ERD에서는 관계를 위해 속성을 도출하지는 않는다.
- 관계의 표현에는 이항 관계(Binary Relationship), 삼항 관계(Ternary Relationship), n항 관계가 존재할 수 있는데 실제에 있어서 삼항 관계 이상은 잘 나타나지 않는다.

![](./imgs/%EA%B4%80%EA%B3%84%EC%9D%98%20%ED%8E%98%EC%96%B4%EB%A7%81.png)

## One to Few 관계 ( 하나 당 적은 수)

> 부모 객체의 문맥 밖에서 embedded된 객체에 접근이 필요하지 않을 때

사람들의 주소를 DB에 저장하는 것으로 예를 들어보자. embedding의 좋은 예인데, User 객체 안에 주소를 array형식으로 넣었을 때 embedding의 장단점을 동시에 가지게 된다.

- 장점: 주소를 얻기 위해 별도의 쿼리가 필요 없다.
- 단점: 주소를 독립된 개체(stand-alone entities)로 접근할 방법이 없다.

단점을 추가적으로 예를 들면 업무 관리 시스템을 모델링할 때, 사람마다 많은 업무를 가지게 될 것이다. 하지만 기한이 내일까지인 모든 업무를 보여달라는 요청이 들어올 때, 필요 이상으로 쿼리가 어렵게 된다.

```js
// user.js
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!!");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  address: [
    {
      _id: { id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    first: "Harry",
    last: "Potter",
  });
  u.addresses.push({
    street: "123 Sesame St.",
    city: "New York",
    stat: "NY",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "99 3rd St.",
    city: "New York",
    stat: "NY",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
};

makeUser();
addAddress("사용자의 id");
```

addresses에 데이터를 추가할 때 id값이 자동으로 생성된다. id값을 생성하는 걸 원치 않으면 \_id: {id: false} 를 스키마 항목에 추가한다.  
사용자의 id 값을 찾아서 새로운 주소를 추가할 수도 있다.

## one to many의 관계 ( 하나 당 많은 수 )

> one-to-many 관계이거나 N-side 객체가 독립적이어야 할 때

주문 시스템의 교체 부품(parts)를 예로 들어보자. 대부분의 상품은 교체할 부품( 다른 사이즈의 볼트들이나 워셔 )이 몇백개까지 될 수 있지만, 몇천개까지는 아닐 확률이 높다. 이런 상황이 참조에 좋은 케이스이다. 상품 document에 부품들로 이루어진 array의 ObjectId를 넣게 된다.

```js
> db.parts.findOne()
{
    _id: ObjectID('AAAA'),
    partno : '123-aff-456',
    name : '#4 grommet',
    qty: 94,
    cost: 0.94,
    price: 3.99
}
```

각 상품은 자신만의 document를 가지고, 상품을 구성하고 있는 부품의 ObjectId들을 array로 가진다.

```js
> db.products.findOne()
{
    name: 'left-handled smoke shifter',
    manufacturer : 'Acme Corp',
    catalog_number : 1234,
    parts : [               // array of references to Part documents
        ObjectID('AAAA'),   // reference to the #4 grommet above
        ObjectID('F17C'),   // reference to a different Part
        ObjectID('D2AA')
    ]
}
```

그러면 특정 상품의 부품을 검색할 때 application-level join을 사용할 수 있게 된다.

```js
// 카탈로그 번호로 확인된 상품 객체를 불러옴
> product = db.products.findOne({catalog_number: 1234});

// 상품과 연결된 모든 파츠를 불러옴
> product_parts = db.parts.find({_id: { $in : product.parts }}).toArray();
```

이런 스타일의 참조는 embedding에 있어 보완적인 장점과 단점을 가진다.

- 장점: 각 부품은 독립된 document이기 때문에 독립적으로 검색하거나 수정하는 것이 쉽다.
- 단점: 상품의 부품을 얻기 위해서 2차 쿼리를 해야한다는 점이다.

그리고 이 스키마는 테이블간 join을 할 필요 없이 각 부품들이 여러 상품에서 쓰일 수 있게 하기 때문에, N-to-N 관계가 된다.

## One To Bajillions 관계 ( 하나 당 아주 많이 )

데이터의 양이 아주 많을 때는 부모에 대한 레퍼런스를 자식에 저장하는 게 여기의 ID 목록처럼 자식에 대한 레퍼런스를 부모에 저장하는 것보다 더 효율적일 때가 많다. 트위터를 예로 들면 사용자의 트윗이 수백만 개일 때는 사용자에 대한 레퍼런스를 개별 트윗에 저장하는 게 효율적이라는 것이다.

```js
// tweet.js
...(mongoose 연결)
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
    // user를 레퍼런스로 설정한다.
})

// 두 개의 모델 생성.
const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    const u = new User({ username: 'chickenfan99', age: 61 })
    const tweet1 = new Tweet({ text: 'omg I love my chicken family!', likes: 0});
    tweet1.user = user;
    user.save();
    tweet1.save();
}

makeTweets();
```

tweets 모델을 검색하면 'omg I love my chicken family!', likes: 0 이 나타나고, user : ObjectId(...) 도 정상적으로 나타난다. user를 나타내는 전체 객체를 가져다 user 특성으로 설정하고 마치 전체 항목이 저장되는 것처럼 취급을 한 건데, 사실 저장을 할 때 객체ID를 저장한다.  
아래의 예제에서 트윗을 추가해보자.

```js
...
// 두 개의 모델 생성.
const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    const user = await User.findOne({ username: 'chickenfan99'})
    const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 1239 });
    tweet2.user = user;
    tweet2.save();
}

makeTweets();
```

tweets 모델을 검색하면 tweet1과 tweet2가 잘 나온다.  
이번에는 mongoose를 이용해 데이터베이스를 쿼리해서 트윗을 찾아보자.

```js
...
// 두 개의 모델 생성.
const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user')
    // populate('user', 'username') 으로 작성하면 user 모델의 username만 출력된다.
}

findTweet();
```

populate() 메서드를 사용하지 않으면 user의 객체ID만 나타난다. populate()메서드를 사용하면 user의 username과 age까지 나타난다. populate는 채워준다는 뜻이다.

## Mongo 스키마 디자인

1. 다른 이유가 없는 한 우선 정보를 임베드해야 한다.
2. 자체적으로 개체에 액세스해야 하는 것은 개체를 임베드하지 않는 강력한 이유이다.
3. 제한이 없이 계속해서 커지기만 하는 배열은 항상 피해야 한다.
4. 비정규화를 할 때 읽기-쓰기 비율을 고려해야 한다.
5. 항상 Mongo를 사용할 때 데이터를 모델링하는 방식은 전적으로 데이터 액세스 패턴에 달려 있다. 데이터를 구조화할 때는 앱이 쿼리하고 업데이트하는 방식에 맞춰야 한다.
