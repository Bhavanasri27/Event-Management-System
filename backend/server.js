const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ ENV VARIABLES (IMPORTANT FOR DEPLOYMENT)
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eventDB";

// ✅ CONNECT MONGODB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ IMPORT MODEL
const Event = require("./models/Event");

// ✅ AUTH ROUTES
app.use("/api/auth", require("./routes/auth"));


// 🔥 BOOK EVENT (WITH UNIQUE CODE)
app.post("/api/events", async (req, res) => {
  try {
    const { date, time } = req.body;

    // ✅ CHECK SLOT
    const exist = await Event.findOne({ date, time });
    if (exist) return res.json({ msg: "Slot Filled" });

    // ✅ GENERATE UNIQUE CODE
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


// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/events", (req, res) => {
  res.json([]);
});


// ✅ START SERVER
app.listen(PORT, () => console.log(`Server running on ${PORT}`));