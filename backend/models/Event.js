const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  venue: String,
  code: String
});

module.exports = mongoose.model("Event", EventSchema);