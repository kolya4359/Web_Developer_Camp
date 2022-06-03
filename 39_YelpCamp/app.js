const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
// ejs파일을 실행하거나 파싱할 때 쓰이는 엔진은 여러가지가 있는데
// Express가 사용하는 디폴트 엔진 대신 사용하라고 정해줘야 한다.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
// express의 정적파일을 사용할 때 public 폴더에 있는 것을 사용하겠다는 의미.
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 만료 기간
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
// 생성되지 않은 config 객체를 전달하기 위해 sessionConfig 를 만든다.

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// passport.session() 은 session() 보다 뒤에 작성해야 한다.
passport.use(new LocalStrategy(User.authenticate()));
// User모델에 정적 메서드를 사용한다는 뜻이다.

passport.serializeUser(User.serializeUser());
// passport에게 사용자를 어떻게 직렬화하는지 알려주고,
// 직렬화는 어떻게 데이터를 얻고 세셔에서 사용자를 저장하는지를 참조한다.
passport.deserializeUser(User.deserializeUser());
// deserialize = 역직렬화

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  // 항상 success인 키에 접근하도록 했다.
  res.locals.error = req.flash("error");
  // 플래시에 error인 키를 이용해 심각한 오류가 생겼거나
  // 오류에 응답하는 플래시 메시지를 띄울 때 플래시를 사용할 수 있다.
  next();
});
// 템플릿에 값을 전달하지 않도록 미들웨어로 만들었다.

app.get("/fakeUser", async (req, res) => {
  const user = new User({ email: "coltttt@gmail.com", username: "coltttt" });
  const newUser = await User.register(user, "chicken");
  res.send(newUser);
});
// 실행하면 username, id, email, salt, hash 값이 나온다.
// passport는 Pbkdf2 암호 해시 함수를 사용한다.

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
