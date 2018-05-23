const commentRouter = require('express').Router();
const CommentController = require('../controller/comment.controller');
const permission = require('permission');

commentRouter.get('/', CommentController.list);
commentRouter.get('/:id', permission(), CommentController.find);
commentRouter.post('/', permission(), CommentController.create);
commentRouter.put('/:id', permission(), CommentController.update);
commentRouter.delete('/:id', permission('admin'), CommentController.delete);

module.exports = commentRouter;
