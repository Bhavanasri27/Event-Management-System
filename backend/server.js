const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ ENV VARIABLES
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ CONNECT MONGODB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ IMPORT MODEL
const Event = require("./models/Event");

// ✅ ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));

// ✅ TEST ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ TEST API ROUTE
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working ✅" });
});

// 🔥 BOOK EVENT
app.post("/api/events", async (req, res) => {
  try {
    const { date, time } = req.body;

    const exist = await Event.findOne({ date, time });
    if (exist) return res.json({ msg: "Slot Filled" });

    const code = Math.random().toString(36).substring(2, 7).toUpperCase();

    const event = new Event({
      ...req.body,
      eventCode: code
    });

    await event.save();

    res.json({ msg: "Booked", code });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error" });
  }
});

// 🔥 GET EVENT BY CODE
app.get("/api/events/:code", async (req, res) => {
  try {
    const code = req.params.code.toUpperCase().trim();

    const event = await Event.findOne({ eventCode: code });

    if (!event) return res.json({ msg: "Invalid Code" });

    res.json(event);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error" });
  }
});

// 🔥 GET ALL EVENTS
app.get("/api/events", (req, res) => {
  res.json([]);
});

// ✅ START SERVER (ONLY ONCE!)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});