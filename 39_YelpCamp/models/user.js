const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
UserSchema.plugin(passportLocalMongoose);
// 사용자 이름과 암호는 지정 안해도 된다. 패키지를 불러온 결과를
// UserSchema.plugin에 전달한다. 그러면 이게 스키마에 사용자 이름과 암호 필드를 추가해준다.

module.exports = mongoose.model("User", UserSchema);
