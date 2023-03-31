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
const userData = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      telNum: String,
      lat: String,
      lng: String,
      nameOnCard: String,
      cardNum: String,
      exp: String,
      cvv: String,
      status: String,
});
const listUserItem = new mongoose.Schema({
    name: String,
    TotalPrice: Number,
    userInput:[userData], 
    items: [userItem]
});

exports.Item = mongoose.model("item",itemSchema);
exports.Item2 = mongoose.model("item2",userItem);
exports.List = mongoose.model("list",listUserItem);
exports.User = mongoose.model("user",userData);