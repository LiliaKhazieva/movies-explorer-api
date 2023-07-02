const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateMovieId } = require('../middlewares/validate');

const movieRouter = express.Router();

movieRouter.get('/', getMovies);

movieRouter.post('/', validateCreateMovie, createMovie);

movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
