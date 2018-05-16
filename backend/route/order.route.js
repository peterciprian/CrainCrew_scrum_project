const orderRouter = require('express').Router();
const OrderController = require('../controller/order.controller');
const permission = require('permission');

orderRouter.get('/', permission(), OrderController.list);
orderRouter.get('/:id', permission(), OrderController.find);
orderRouter.post('/', permission('admin'), OrderController.create);
orderRouter.put('/:id', permission('admin'), OrderController.update);
orderRouter.put('/:id', permission('admin'), OrderController.delete);

module.exports = orderRouter;
