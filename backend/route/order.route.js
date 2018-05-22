const orderRouter = require('express').Router();
const OrderController = require('../controller/order.controller');
const permission = require('permission');

orderRouter.get('/', permission(), OrderController.list);
orderRouter.get('/:id', permission(), OrderController.find);
orderRouter.post('/', permission(), OrderController.create);
orderRouter.put('/update/:id', permission('admin'), OrderController.update);
orderRouter.delete('/delete/:id', permission('admin'), OrderController.delete);

module.exports = orderRouter;
