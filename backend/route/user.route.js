const passport = require('passport');
const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');
const permission = require('permission');
<<<<<<< HEAD
 
=======

>>>>>>> def6d988f592efe72207dda022c9d8e257c13068
userRouter.get('/profile', UserController.profile);
userRouter.post('/register', UserController.register);
userRouter.post('/login', passport.authenticate('local'), UserController.login);
userRouter.get('/logout', UserController.logout);

userRouter.delete('/:id', UserController.delete);
userRouter.put('/update/:id', UserController.updateProfile);
userRouter.get('/users', permission('admin'), UserController.list);


module.exports = userRouter;
