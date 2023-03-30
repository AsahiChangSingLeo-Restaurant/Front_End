const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
       _id: Number,
       imageURL: String,
       name: String,
       description: String,
       price: Number
});
const userItem = new mongoose.Schema({
       imageURL: String,
       name: String,
       price: Number,
       SubTotalPrice: Number,
       quantity: {
        type: Number,
        required: true,
        min: [1,'Cant less than One'],

       }
});
const listUserItem = new mongoose.Schema({
    name: String,
    TotalPrice: Number,
    items: [userItem]
});

exports.Item = mongoose.model("item",itemSchema);
exports.Item2 = mongoose.model("item2",userItem);
exports.List = mongoose.model("list",listUserItem);