const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const lo = require("lodash");
const User = require("../Models/User");
const { registrationVal, loginVal } = require("../Validations/auth");

router.post("/register", (req, res) => {
  registrationVal
    .validate(req.body)
    .then(async () => {
      const emailExists = await User.findOne({ email: req.body.email });

      if (emailExists) {
        return res.status(400).json({ message: "Email already in use." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      try {
        const newUser = User({ ...req.body, password: hashedPassword });
        const userSaved = await newUser.save();
        return res.status(200).json({ user: userSaved.id });
      } catch (error) {
        return res.status(500).json({ error });
      }
    })
    .catch((error) => {
      return res.status(400).json({ message: error.message });
    });
});

router.post("/login", (req, res) => {
  loginVal
    .validate(req.body)
    .then(async () => {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Email or Password incorrect!" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res
          .status(401)
          .json({ message: "Email or Password incorrect!" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      const { friends, posts, email, firstName, lastName } = user;

      return res.header("auth-token", token).status(200).json({
        message: "Logged in!",
        authToken: token,
        userInfo: { friends, posts, email, firstName, lastName },
      });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
});

router.post("/authenticate", (req, res) => {
  const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  if (verified) {
    return res.status(200).json({ verified: true });
  }
  return res.status(400).json({ verified: false });
});

module.exports = router;
