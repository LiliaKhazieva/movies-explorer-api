const express = require('express');
const { getCurrentUser, changeUserInfo } = require('../controllers/users');
const { validateChangeUserInfo } = require('../middlewares/validate');

const userRouter = express.Router();

userRouter.get('/me', getCurrentUser);// текущий пользователь

userRouter.patch('/me', validateChangeUserInfo, changeUserInfo); // обновить даннные пользователя

module.exports = userRouter;
