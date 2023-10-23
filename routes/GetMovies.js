const express = require("express");
const { body, query, validationResult } = require("express-validator");
const Movie = require("../models/Movie");

const router = express.Router();

router.get(
  "/getMovies",
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("La página debe ser un número entero positivo"),
  ],
  async (req, res) => {
    // Validar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 6;

      const startIndex = (page - 1) * limit;

      const movies = await Movie.find().skip(startIndex).limit(limit);

      const totalCount = await Movie.countDocuments();

      const pagination = {
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      };

      res.status(200).json({
        movies,
        pagination,
      });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las películas" });
    }
  }
);

module.exports = router;
