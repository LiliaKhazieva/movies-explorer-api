const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const { validateLogin, validateCreateUser } = require('../middlewares/validate');

router.post('/signin', validateLogin, login);

router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
