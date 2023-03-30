
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const lodash = require('lodash');
const mongo = require('./config/db');
const { result } = require('lodash');
const Item = require('./model/listItem').Item;
const Item2 = require('./model/listItem').Item2;
const List = require('./model/listItem').List;
const User = require('./model/listItem').User;
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

const food1 = new Item({
    _id: 1,
    imageURL : 'css/images/Nugget.jpg',
    name: 'Dog Meat',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 65,
});
const food2 = new Item({
    _id: 2,
    imageURL : 'css/images/Pizza.jpg',
    name: 'Donut but no hole in the middle',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 300,
});
const food3 = new Item({
    _id: 3,
    imageURL : 'css/images/wtf.jpg',
    name: 'I think this is cat meat',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 120, 
});
const food4 = new Item({
    _id: 4,
    imageURL : 'css/images/menu-4.jpg',
    name: 'Panda milk ice-cream',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 60,
});
const food5 = new Item({
    _id: 5,
    imageURL: 'css/images/menu-5.jpg',
    name: 'Meow',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 75,
});
const food6 = new Item({
    _id: 6,
    imageURL: 'css/images/menu-6.jpg',
    name: 'Yeah Bwoi💩',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 99,
})
const foodMenu = [food1,food2,food3,food4,food5,food6] ;

const drink1 = new Item({
    _id: 7,
    imageURL: 'css/images/Asahi1.jpg',
    name: 'Holy Drink from japan',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 85
});
const drink2 = new Item({
    _id: 8,
    imageURL: 'css/images/Asahi2.jpg',
    name: 'Holy drink from japan but bottle',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 120
});
const drink3 = new Item({
    _id: 9,
    imageURL: 'css/images/Chang1.jpg',
    name: 'Elephant Beer',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 75,
});
const drink4 = new Item({
    _id: 10,
    imageURL: 'css/images/Chang2.jpg',
    name: 'Elephat, again.',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 90,
});
const drink5 = new Item({
    _id: 11,
    imageURL: 'css/images/Sing1.jpg',
    name: 'Golden Lion',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 80
});
const drink6 = new Item({
    _id : 12,
    imageURL: 'css/images/Leo1.jpg',
    name: 'Faster than turtle',
    description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 75,
});
const drink7 = new Item({
    _id: 13,
    imageURL: 'css/images/Leo2.jpg',
    name: 'Cheetah in a bottle',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 100,
});
const drink8 = new Item({
    _id: 14,
    imageURL: 'css/images/Schweppes.jpg',
    name: 'I prefer sprite',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 30,
});
const drink9 = new Item({
    _id: 15,
    imageURL: 'css/images/Coke.jpg',
    name: 'What is pepsi?',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.',
    price: 25,
});




const drinkMenu = [drink1,drink2,drink3,drink4,drink5,drink6,drink7,drink8,drink9];

app.get('/',async (req,res)=>{
    const items = await Item.find({});
    const cartItems = await Item2.find({});
    var totalPrice = 0;
    if(items.length == 0)
    {
      Item.insertMany(foodMenu)
      .then(() => {
        console.log("Added food successfully");
      })
      .catch((err) => console.log(err));
      Item.insertMany(drinkMenu)
      .then(() => {
        console.log("Added drink successfully");
      })
      .catch((err) => console.log(err));
    }
   for(i = 0; i < cartItems.length; i++){
    totalPrice += cartItems[i].SubTotalPrice;
   }
    res.render('home',{
         foodMenu:foodMenu,
         drinkMenu:drinkMenu,
         cartItems:cartItems,
         totalPrice:totalPrice
    });
 
});
app.get('/checkout',async (req,res)=>{
    const cartItems = await Item2.find({});
    var totalPrice = 0;
    for(i = 0; i < cartItems.length; i++){
        totalPrice += cartItems[i].SubTotalPrice;
    }
    res.render('checkout',{
        cartItems:cartItems,
        totalPrice:totalPrice
    })
});
app.get('/checkbill',(req,res)=>{
    res.render('checkbill');
})
app.post('/tohome',(req,res)=>{
    console.log('Go to Home Page');
   res.redirect('/');
});

app.post('/go-to-checkout',(req,res)=>{
    res.redirect('/checkout');
});
app.post('/add-food',async (req,res)=>{
  const foodButton = req.body.buttonFood;
  const drinkButton = req.body.buttonDrink;
  if(foodButton){
    const result = await Item.findById(req.body.buttonFood);
    const userItem = new Item2({
      imageURL: result.imageURL,
      name: result.name,
      price: result.price,
      SubTotalPrice: result.price,
      TotalPrice: 0,
      quantity: 1,
      
  });
    userItem.save();
    
    const updateList = await List.updateOne(
    { $push: { items: userItem } });
    res.redirect('/');
  }
  else if(drinkButton){
    const result = await Item.findById(drinkButton);
    const userItem = new Item2({
        imageURL: result.imageURL,
        name: result.name,
        price: result.price,
        SubTotalPrice: result.price,
        quantity: 1,
  
    });
      userItem.save();
      
      const updateList = await List.updateOne(
      { $push: { items: userItem } });
      res.redirect('/');
  }
 
    });

app.post('/quantity', async(req,res)=>{
const plusButton = req.body.plus;
const minusButton = req.body.minus;
const deleteButton = req.body.delete;
if(deleteButton)
{
    const result2 = await Item2.findByIdAndRemove(deleteButton);
    const updateList = await List.updateOne(
        { $pull: { items: deleteButton } })
        .then(()=>{
            res.redirect('/');
        })
        .catch((err) => {
            console(err);
        })


}
else if(plusButton)
{
   const result = await Item2.findById(plusButton)
  
   const result2 = await Item2.findByIdAndUpdate(
    {_id:plusButton},
    { $set : {quantity: result.quantity + 1}},
   )
  
   const result4 = await Item2.findById(plusButton)
   const result3 = await Item2.findByIdAndUpdate(
    {_id:plusButton},
    { $set : {SubTotalPrice: result4.price * result4.quantity}}
   )


   .then(() =>{
   
    console.log(result.SubTotalPrice);
    res.redirect('/');
   })
   .catch((err)=>{
    console.log(err);
   });
}
else if(minusButton){
    const result = await Item2.findById(minusButton)
  
    const result2 = await Item2.findByIdAndUpdate(
     {_id:minusButton},
     { $set : {quantity: result.quantity - 1}}
    )

   const result4 = await Item2.findById(minusButton)
   const result3 = await Item2.findByIdAndUpdate(
    {_id:minusButton},
    { $set : {SubTotalPrice: result4.price * result4.quantity}}
   )
    .then(() =>{
     console.log('Add complete!');
     res.redirect('/');
    })
    .catch((err)=>{
     console.log(err);
    })
}

});
app.post('/checkbill',async(req,res)=>{
    const userCart = await Item2.find({});
     const userInfo = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telNum: req.body.tel,
        address: req.body.address,
        addressOpt: req.body.address2,
        province: req.body.province,
        zipCode: req.body.zipCode,
        nameOnCard: req.body.nameCard,
        cardNum: req.body.cardNum,
        exp: req.body.exp,
        cvv: req.body.cvv
     });
     userInfo.save();
     const arrayName = userInfo.firstName;
     const list = new List({
        name: arrayName,
        userInput: userInfo,
        items: userCart
     });
     list.save();
     res.redirect('/')
});

mongo.connect();

app.listen(3000, function(){
    console.log("Server start on port 3000");
});
