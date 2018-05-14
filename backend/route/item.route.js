const itemRouter = require('express').Router();
const ItemController = require('../controller/item.controller');
const permission = require('permission');

itemRouter.get('/profile', permission(), ItemController.profile);
itemRouter.post('/register', ItemController.register);
itemRouter.post('/login', ItemController.login);
itemRouter.get('/logout', ItemController.logout);

module.exports = itemRouter;
