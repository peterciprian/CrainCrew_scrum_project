// const multer = require('multer');
const itemRouter = require('express').Router();
const ItemController = require('../controller/item.controller');
const permission = require('permission');

const multer = require('multer');


// ***** file upload **
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    const newFileName = new Date().toISOString().replace(/:/g, '-').concat(file.originalname.substr(file.originalname.indexOf('.')));
    cb(null, newFileName);
  },
});

// ***** IMG file extension validation *****
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// ***** IMG max upload limit 2Mb *****
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});


itemRouter.get('/', permission(), ItemController.list);
itemRouter.get('/:id', permission(), ItemController.find);
itemRouter.post('/', permission('admin'), ItemController.create);
itemRouter.put('/:id', permission('admin'), ItemController.update);
itemRouter.delete('/:id', permission('admin'), ItemController.delete);

module.exports = itemRouter;
