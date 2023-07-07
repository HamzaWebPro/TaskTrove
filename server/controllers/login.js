const emailValidation = require("../helpers/emailValidation");
const User = require("../models/regSchema");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.json({ error: "Please enter your email" });
  }
  if (!emailValidation(email)) {
    return res.json({ error: "Please enter a valid email address" });
  }
  if (!password) {
    return res.json({ error: "Please enter your password" });
  }

  let existingEmail = await User.find({ email });

  if (existingEmail.length === 0) {
    return res.json({ error: "You dont have account.Please create now" });
  }

  bcrypt.compare(password, existingEmail[0].password).then(async function (result) {
    if (!result) {
      return res.json({ error: "Invalid credentials" });
    }
    return res.json({
      user: existingEmail[0], // Sending the user's information
      message: "Login Successful",
    });
  });
}

module.exports = login;
