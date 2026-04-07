const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  venue: String,
  eventCode: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model("Event", eventSchema);