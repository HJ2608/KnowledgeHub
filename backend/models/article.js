const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  tags:      [String],
  summary:   { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
