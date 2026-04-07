const router = require("express").Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.json({ msg: "User already exists" });

  const user = new User({ name, email, password, role });
  await user.save();

  res.json({ msg: "Registered Successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.json({ msg: "Invalid credentials" });

  res.json({ msg: "Login Success", user });
});

module.exports = router;