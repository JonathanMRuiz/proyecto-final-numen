const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false, // No es necesario si no quieres que sea obligatorio
  },
  image: {
    type: String,
    required: false, // No es necesario si no quieres que sea obligatorio
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
