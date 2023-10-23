const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ username, email });

    if (existingUser) {
      return res.status(409).json({ error: "Este usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    const token = jwt.sign({ username }, "1a3e5i7");

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

module.exports = router;
