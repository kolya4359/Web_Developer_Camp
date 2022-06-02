const bcrypt = require("bcrypt");

// const hashPassword = async () => {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(pw, salt);
//   console.log(salt);
//   console.log(hash);
// };

const hashPassword = async (pw) => {
  const hash = await bcrypt.hash(pw, 12);
  console.log(hash);
};

const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
    console.log("LOGGED YOU IN! SUCCESSFUL MATCH!");
  } else {
    console.lo("INCORRECT!");
  }
};

hashPassword("monkey");
login("monkey", "$2b$10$cUDT3BCQgKNJBKuc2.Jh0OAtQA9Vvpzjm47D6TOxBFSig7Hm7EzSO");
