const express = require ('express');
const customerData = require('./database.js')

require('dotenv').config()
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
const sendEmail = require('./email.js')


app.post('/store',async(req,res)=>{


    // const custimerDetails = new customerData(req.body);    ///for production data will come from frontend

    const customerDetails = new customerData({'name':'ayush',
      'email':'ayushakash9@gmail.com' ,
      'phone':'8553545862', 
      'address':'kadru' , 
        'city':'ranchi' ,
          'mop':'cod' ,
          'total':'5000'})    //add the form data here
    try {
        
        await customerDetails.save();
        // res.status(200);
        res.send('user saved sucessfully');
        res.send(req.body);
        // res.send(customerDetails);
    } catch (error) {
        res.status(400)
        res.send('Not updated');
    }


})

//email sending and saving to database both are done by the below route i.e. '/email'

app.post('/email', cors(), async (req, res) => {

    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');

   let {name,address,customerEmail,retailerEmail,mop,storeName}=req.body;
   const customerDetails = new customerData(req.body);
   await customerDetails.save();

    console.log((req.body))

    // res.send({'Email Status': 'Sent'})
    res.send(req.body)
    console.log('Email Sent');

    await sendEmail(name, customerEmail, retailerEmail, mop, address, storeName);
})



app.listen('4000',
    console.log('app running on port 4000')
)