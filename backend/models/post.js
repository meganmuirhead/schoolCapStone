const mongoose = require("mongoose");

// schema holds custom configuration
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: Sting, required: true }
});

module.exports = mongoose.model("Post", postSchema);
