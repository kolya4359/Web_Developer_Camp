const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
});

userSchema.statics.findAndValidate = async function (username, password) {
  const findUser = this.findOne({ username });
  // this는 특정 모델이나 스키마를 나타낸다. 여기선 User이다.
  const isValid = await bcrypt.compare(password, findUser.password);
  return isValid ? findUser : false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // this.isModified()는 특정 User 모델 내 암호 변경 여부를 참, 거짓으로 나타낸다.
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
// userSchema에 'save' 하기 전에 콜백함수를 실행한다.
// 여기서 this는 User 모델을 가리킨다. 고로 User 모델의 비밀번호를 해시화하고,
// 저장한다는 뜻이다. next() 는 save를 실행한다.

module.exports = mongoose.model("User", userSchema);
