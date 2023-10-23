const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.post("/postMovie", async (req, res) => {
  try {
    const { title, year, description, image } = req.body;

    const existingMovie = await Movie.findOne({ title });

    if (existingMovie) {
      return res
        .status(400)
        .json({ error: "Ya existe una pelicula con ese mismo nombre" });
    }

    const movie = new Movie({
      title,
      year,
      description,
      image,
    });

    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar tu pelicula" });
  }
});

module.exports = router;
