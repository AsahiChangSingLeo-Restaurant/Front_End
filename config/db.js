const mongoose = require('mongoose');

exports.connect =  ()=>{
  mongoose.connect('mongodb+srv://yanwarut:1234@projectfrontend.ymuc0on.mongodb.net/orderList',{ 

     })
      .then(() => console.log('Database is connected'))
      .catch((e) => console.log(e));
};
