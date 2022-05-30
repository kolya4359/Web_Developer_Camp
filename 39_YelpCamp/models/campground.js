const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
// doc(document) 이 문서가 가지고 있는 리뷰 중 리뷰 배열에서 삭제된 ID 필드를 가진 모든 리뷰를 삭제한다.

module.exports = mongoose.model("Campground", CampgroundSchema);
