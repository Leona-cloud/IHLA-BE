const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  math: {
    type: Object,
    required: true,
  },
  science: {
    type: Object,
    required: true,
  },
  history: {
    type: Object,
    required: true,
  },
}, {timestamps: true});

const FormData = mongoose.model("FormData", FormSchema);

module.exports = FormData
