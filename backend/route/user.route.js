const passport = require('passport');
const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');
const permission = require('permission');

userRouter.get('/profile', permission(), UserController.profile);
userRouter.post('/register', UserController.register);
userRouter.post('/login', passport.authenticate('local'), UserController.login);
userRouter.get('/logout', UserController.logout);

module.exports = userRouter;
