const itemRouter = require('express').Router();
const ItemController = require('../controller/item.controller');
const permission = require('permission');

itemRouter.get('/', ItemController.list);
itemRouter.get('/:id', ItemController.find);
itemRouter.post('/', permission('admin'), ItemController.create);
itemRouter.put('/:id', permission('admin'), ItemController.update);
itemRouter.delete('/:id', permission('admin'), ItemController.delete);

module.exports = itemRouter;
