'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  itemName:{type: String, required: true},
  expirationDate:{type: Date, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

schema.set('timestamps', true);

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('pantryItem', schema);