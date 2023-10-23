const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.delete("/deleteMovie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Pelicula no encontrada" });
    }

    res.status(202).json({ message: "Pelicula eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar pelicula" });
  }
});

module.exports = router;
