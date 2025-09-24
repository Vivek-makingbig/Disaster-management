const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../Models/user');

const router = express.Router();
const SECRET = process.env.JWT_SECRET 

// Register (always as user)

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, role: "user" }); // role always "user"
    await user.save();
    res.json({ message: "User registered successfully" });
  }
   catch (err) 
   {
    res.status(400).json({ message: "Error registering user", error: err.message });
   }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1h" });
  res.json({ token, role: user.role });
});

module.exports = router;