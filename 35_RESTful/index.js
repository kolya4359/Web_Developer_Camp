const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.use(express.urlencoded({ extended: true }));
// 요청 data 분석
app.use(express.json()); // JSON data를 분석
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuid(),
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});
// comments 폴더의 index.ejs에 comments 데이터를 넘기고 렌더링한다.

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});
// 폼을 렌더링하는 /new템플릿이다.

// 새로운 댓글 만들기
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments"); // 경로(/comments)로 강제로 이동시키는 메서드이다.
});
// 폼에 데이터를 제출한다.

// slug 사용
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  // req.params에서 문자열로 넘어오기 때문에 숫자형으로 변환해준다.
  // const comment = comments.find((c) => c.id === parseInt(id));
  const comment = comments.find((c) => c.id === id);
  // uuid 라이브러리를 사용하면 정수를 숫자형으로 반환하지 않아도 된다.
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
  // { comment } 를 출력하는 이유는 기존의 작성되어 있는 내용을 출력하기 위해서이다.
  // 빈 폼으로 띄울 수도 있다.
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.commet;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`OK, here are yout ${qty} ${meat} tacos`);
});

app.listen(3000, () => {
  console.log("ON PORT 3000!");
});
