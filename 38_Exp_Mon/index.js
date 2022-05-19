const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// 연결하기 위해서 모델을 요청한다.
const Product = require("./models/product");

// mongoose를 이용하여 데이터베이스 연결하기.
mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!");
    console.log(err);
  });

// 화면에 렌더링하는 뷰 폴더를 views 폴더로 지정하고, ejs 템플릿을 사용.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
// Post 요청 시 req.body에 접근하기 위해 설정.
app.use(methodOverride("_method"));
// Put 요청을 할 수 있게 도와준다.

const categories = ["fruit", "vegetable", "dairy"];

// 비동기 라우터를 위한 콜백
app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products });
  }
});

// new 페이지는 비동기 함수를 만들 필요가 없다.
app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});
// Post 요청을 받으면 그 body의 정보가 필요하지만 req.body로 바로 접근할 수 없다.
// 할 순 있지만 undefined 값을 갖는다. 그래서 urlencoded 미들웨어를 사용한다.

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});
// findByIdAndUpdate의 첫 번째는 id, 두 번째는 update, 세 번째는 options 이다.
// runValidators는 업데이트 시 유효성 검사를 진행하는 옵션이다.

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDeleted(id);
  res.redirect("/products");
});

// 3000번 포트를 사용한다.
app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
