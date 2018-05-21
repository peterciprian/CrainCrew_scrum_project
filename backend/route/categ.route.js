const categRouter = require('express').Router();
const CategController = require('../controller/categ.controller');
const permission = require('permission');

categRouter.get('/', CategController.list);
categRouter.get('/:id', permission('admin'), CategController.find);
categRouter.post('/', permission('admin'), CategController.create);
categRouter.put('/:id', permission('admin'), CategController.update);
categRouter.delete('/:id', permission('admin'), CategController.delete);

module.exports = categRouter;
