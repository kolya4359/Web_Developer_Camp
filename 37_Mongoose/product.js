const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/shopApp", {
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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  categories: {
    type: [String],
    default: ["cycling"],
  },
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

// 화살표 함수가 아닌 기존의 함수 표현식을 사용해야 한다. 함수의 값이 변하기 때문이다.
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};
// 함수를 호출할 때마다 onSale의 boolean 값이 변하는 메서드.

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};
// 함수를 호출할 때마다 categories에 newCat인자가 더해지는 메서드.

// 정적 메서드
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Bike Helmet" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory("Outdoors");
  console.log(foundProduct);
};

Product.fireSale().then((res) => console.log(res));

const bike = new Product({
  name: "Tire Pump",
  price: 19.5,
  categories: ["cycling"],
});
bike.save();
// const bike = new Product({
//   name: "Mountain Bike",
//   price: 599,
//   categories: ["Cycling", "Safety"],
// });
// bick
//   .save()
//   .then((data) => {
//     console.log("IT WORKED!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO ERROR!");
//     console.log(err);
//   });

Product.findOneAndUpdate(
  { name: "Trip Pump" },
  { price: -10.99 },
  { new: true, runValidators: true }
)
  // runValidators 옵션이 없다면 price의 최솟값을 0으로 설정해도
  // 업데이트 할때 -10.99를 입력해도 오류가 나지 않는다.
  .then((data) => {
    console.log("IT WORKED!");
    console.log(data);
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err);
  });
