# Section45: Express와 Mongo를 연결하기

### (Section38에서 작성한 예제 참조)

## Farm 모델과 Product 모델 정의하기

새로운 농장을 생성할 템플릿으로 이동하는 라우터를 만든다.  
우선 새로운 농장 모델부터 정의한다.

```js
// farm.js
const mongoose = requrie("mongoose");
const { Schema } = mongoose;

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farms must have a name!"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },
  products: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Product'
      }
  ]
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;

// product.js
...
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
}
...
```

farm.js 파일에선 products 스키마에서 product.js 파일을 참조하고,  
product.js 파일에선 farm 스키마에서 farm.js 파일을 참조한다.
이제 쌍방 관계가 형성되었다.

## 새로운 Farm 모델 작성하기

사용자가 농장을 생성할 수 있는 새로운 폼을 렌더링한다.  
views 폴더에 farms 폴더를 만들고 새로운 농장을 렌더링 하는 페이지를 넣는다.  
index.js 에 Farm 라우터를 작성한다.

## farms show page

farms/:id 경로로 이동하면 해당 id를 가진 상품의 정보를 보여주는 show page와 show 라우터를 만든다.

## farm용 products 작성하기

새로운 상품을 만들어 특정한 농장에 연결시킨다.  
각 농장의 show 페이지에 새 상품을 추가하는 링크를 만든다. 원하는 농장으로 이동한 다음 링크를 눌러 상품을 추가하는 방식이다.

> /farms/:farm_id/products/new  
> farm_id의 농장에 새 상품을 추가한 다음 products/new 경로에 Post 요청을 보내는 중첩 라우팅을 사용한다.

## 마무리 손질하기

우선 HTML의 응답을 POST 요청에서 바로 보내느 부분을 수정한다.  
농장에서 새로운 상품 등록을 하면 농장의 show page 로 이동하도록 redirect() 를 사용한다.

## 몽구스 미들웨어 삭제

delete 라우터를 설정해서 농장 하나를 삭제하면 그 농장에 속해 있는 상품들도 삭제되도록 한다.
