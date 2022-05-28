const mongoose = require("mongoose");
const Product = require("./product");
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
      ref: "Product",
    },
  ],
});

farmSchema.post("findOneAndDelete", async function (farm) {
  if (farm.products.length) {
    const res = await Product.deleteMany({ _id: { $in: farm.products } });
  }
});
// $in: farmSchema.products - ID가 방금 삭제한 농장의 products 배열에
// 들어있는 모든 products를 삭제한다는 뜻이다.
const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
