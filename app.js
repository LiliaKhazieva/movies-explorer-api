require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorHandler = require('./middlewares/centralErrorHandler');

const { PORT = 3000, NODE_ENV, MONGODB } = process.env;
const app = express();
app.use(cors())
mongoose.connect(NODE_ENV === 'production' ? MONGODB : 'mongodb://localhost:27017/bitfilmsdb')

  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log('Error connect');
    console.log(err);
  });
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(centralErrorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
