const Order = require('../models/order-model.js');
const Item = require('../models/item-model.js');
const User = require('../models/user.js');

const mongoose = require('mongoose');

module.exports = {
  list: (req, res) => {
    Order.find({}, (err, datas) => {
      if (err) {
        res.json(err);
      }
      res.json(datas);
    });
  },

  getAllFromUser: (req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        res.json(err);
      }
      Order.find({
        _id: data.tasks,
      }, (err, datas) => {
        if (err) {
          res.json(err);
        }
        res.json(datas);
      });
    });
  },

  create: (req, res) => {
    Order.create(req.body, (err, order) => {
      if (err) {
        res.json(err);
      }
      Item.findById(
        req.body.itemid, {
          $push: {
            items: item._id,
          },
        },
        (err, data) => {
          if (err) {
            res.json(err);
          }
        },
      );
      User.findByIdAndUpdate(
        req.body.userid, {
          $push: {
            orders: order._id,
          },
        },
        (err, data) => {
          if (err) {
            res.json(err);
          }
          res.json({
            success: 'Order created',
          });
        },
      );
    });
  },
  delete: (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, order) => {
      if (err) {
        res.json(err);
      }
      User.findByIdAndUpdate(req.body.userid, {
        $pull: {
          tasks: order._id,
        },
      }, (err, data) => {
        if (err) {
          res.json(err);
        }
        res.json({
          success: 'Order deleted',
        });
      });
    });
  },
  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }, (err, data) => {
      if (err) {
        res.json(err);
      }
      res.json(data);
    });
  },


};
