const express = require("express");
const router = express.Router({ mergeParams: true });
// campgrounds 는 각 라우트마다 params에서 id를 받기 때문에 상관없지만,
// reviews는 campgrounds와 app.js에서 받은 params의 id를 사용한다.
// 파일을 따로 분리할 때 각 라우트의 직접 params의 id를 받거나
// mergeParams를 true로 설정해주어야 params의 id에 접근할 수 있다.

const { reviewSchema } = require("../schemas.js");

const Campground = require("../models/campground");
const Review = require("../models/review");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.datails.map((el) => el.message).join(".");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created new review!");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // 첫 번째 id는 캠핑장 ID를 찾는 id이다.
    // 두 번째 객체에서 $pull은 Mongo에서 사용하는 배열 수정 연산자이다.
    // 배열에 있는 모든 인스턴스 중에 특정 조건에 만족하는 값을 지운다.
    // 리뷰 배열에서 리뷰 ID를 찾아 지운다는 뜻이다.
    await Review.findByIdAndDelete(reviewId);
    res.flash("success", "Successfully deleted review");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
