const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // ENCRYPTION
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PHRASE
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.get("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Login failed, Invalid user ID or password.");
    // DECRYPTION
    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PHRASE
    );
    const stringHashedPass = hashedPass.toString(CryptoJS.enc.Utf8);
    stringHashedPass !== req.body.password &&
      res.status(401).json("Login failed, Invalid user ID or password.");
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_PHRASE,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
