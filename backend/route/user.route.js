const passport = require('passport');
const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');

userRouter.get('/profile', UserController.profile);
userRouter.post('/register', UserController.register);
userRouter.post('/login', passport.authenticate('local'), UserController.login);
userRouter.get('/logout', UserController.logout);
userRouter.delete('/:id', UserController.delete);


module.exports = userRouter;
