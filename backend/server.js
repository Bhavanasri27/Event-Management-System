const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ FIX: Use environment variable OR fallback
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eventDB";

// DB CONNECT
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Models
const User = require("./models/User");
const Event = require("./models/Event");

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ msg: "Registered" });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (!user) return res.status(400).json({ msg: "Invalid" });
    res.json({ role: user.role });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

// CREATE EVENT
app.post("/api/create-event", async (req, res) => {
  try {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const event = new Event({ ...req.body, code });
    await event.save();

    res.json({ code });
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

// GET EVENT
app.get("/api/event/:code", async (req, res) => {
  try {
    const event = await Event.findOne({ code: req.params.code });

    if (!event) return res.status(404).json({ msg: "Invalid Code" });

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

// ✅ FIX: IMPORTANT FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});