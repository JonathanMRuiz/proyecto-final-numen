const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.put("/editMovie/:id", async (req, res) => {
  try {
    const { title, year, description, image } = req.body;
    const movieId = req.params.id;

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      {
        title,
        year,
        description,
        image,
      },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: "Pelicula no encotnrada" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al editar la película" });
  }
});

module.exports = router;
