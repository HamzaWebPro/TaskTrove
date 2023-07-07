const bcrypt = require("bcrypt");
const User = require("../models/regSchema");
const emailValidation = require("../helpers/emailValidation");


async function registration(req, res) {
  const { name, email,profession,avatar ,password} = req.body;


  if (!name) {
    return res.json({ error: "Please enter your full name"});
  }
  if (!email) {
    return res.json({ error: "Please enter your email" });
  }
  if (!emailValidation(email)) {
    return res.json({ error: "Please enter a valid email address" });
  }
  if (!password) {
    return res.json({ error: "Please enter your password" });
  }
  if (!profession) {
    return res.json({ error: "Please enter your profession" });
  }
//   if (!avatar) {
//     return res.json({ error: "Please enter your profile picture" });
//   }

  let duplicateEmail = await User.find({ email: email });
  if (duplicateEmail.length > 0) {
    return res.json({ error: "email already exists" });
  }

  bcrypt.hash(password, 10,async function (err, hash) {
    const user = new User({
      name,
      email,
      password: hash,
      avatar,
      profession
    });
    await user.save();

    return res.json({ 
      fullName:user.fullName,
      email:user.email,
      message: "Registration successfull,Now you can login"
    });
  });
}

module.exports = registration;



