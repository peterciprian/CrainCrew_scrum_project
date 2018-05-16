const orderRouter = require('express').Router();
const OrderController = require('../controller/order.controller');
const permission = require('permission');

orderRouter.get('/', permission(), OrderController.list);
<<<<<<< HEAD
//orderRouter.get('/:id', permission(), OrderController.getAllFromUser);
=======
orderRouter.get('/:id', permission(), OrderController.find);
>>>>>>> cedc0ef26158df26d9dfff7a3a28c9271df02ed8
orderRouter.post('/', permission('admin'), OrderController.create);
orderRouter.put('/update/:id', permission('admin'), OrderController.update);
orderRouter.delete('/delete/:id', permission('admin'), OrderController.delete);

module.exports = orderRouter;
