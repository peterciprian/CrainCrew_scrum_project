// const multer = require('multer');
const itemRouter = require('express').Router();
const ItemController = require('../controller/item.controller');
const permission = require('permission');

itemRouter.get('/', permission(), ItemController.list);
itemRouter.get('/:id', permission(), ItemController.find);
itemRouter.post('/', permission('admin'), ItemController.create);
itemRouter.put('/:id', permission('admin'), ItemController.update);
itemRouter.delete('/:id', permission('admin'), ItemController.delete);

// // File upload parsing
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename(req, file, cb) {
//     const fullFileName = new Date().toISOString().replace(/:/g, '-')
// .concat(file.originalname.substr(file.originalname.indexOf('.')));
//     cb(null, fullFileName);
//   },
// });

// // IMG file extension validation
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// // IMG max upload limit 2Mb
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
// });

// function loggedIn(req, res, next) {
//   // Checks if there's anyone logged in
//   if (req.user) {
//     let user = JSON.stringify(req.user);
//     user = JSON.parse(user);
//     // Checks if the user logged in is an Admin
//     if (user.rights) {
//       next();
//     } else {
//       res.status(500).json({ error: 'Be kell jelentkezned Adminként!' });
//     }
//   } else {
//     res.status(500).json({ error: 'Be kell jelentkezned!' });
//   }
// }

// itemRouter.route('/')
//   .get(ItemController.list)
//   .post(loggedIn, upload.single('img'), ItemController.create);

// itemRouter.route('/:id')
//   .get(ItemController.find)
//   .put(loggedIn, upload.single('img'), ItemController.update)
//   .delete(loggedIn, ItemController.delete);

module.exports = itemRouter;
