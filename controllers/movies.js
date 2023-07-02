const Movie = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

// получить все сохр. фильмы текущего пользователя
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// создать фильм
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      }
      return next(err);
    });
};

// удалить фильм
const deleteMovie = (req, res, next) => {
  Movie.findOne({
    _id: req.params.movieId,
  })
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалить фильм другого пользователя');
      }
      return Movie.deleteOne(movie)
        .then(() => {
          res.send(movie);
        });
    }).catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Фильм с указанным _id не найден'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
