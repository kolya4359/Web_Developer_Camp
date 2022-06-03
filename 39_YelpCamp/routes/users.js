const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      // 새로운 사용자에 대해 암호를 해시하고 솔트를 저장하고 결과를 해시한다.
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        // login() 메서드는 콜백이 필요하므로 await 키워드를 사용할 수 없다.
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  // failureFlash 항목이 플래시 메시지를 자동으로 띄워 준다.
  // failureRedirect 항목은 로그인 실패시 /login 페이지로 이동시켜 준다.
  (req, res) => {
    req.flash("success", "welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.retrunTo;
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  // logout() 메서드도 passport 에서 제공하는 메서드이다.
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
});
module.exports = router;
