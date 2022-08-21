
var nodemailer = require('nodemailer');

   function sendEmail(name, customerEmail, retailerEmail, mop, address, storeName) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.PASSWORD
            }
        });

        transporter.sendMail({
            from: 'info@chardeevari.in',
            to: customerEmail,
            cc: retailerEmail,
            subject: 'Order Confirmed with Anytime Mart',
            html: '<h1>Hello ' + name + ',</h1> <h1 style="color:#008000"> Your grocery item order is received by us ' +
                    ' Your mode of payment is'  + mop + '</h1><h2>' +
                    'Parcel will be delivered to </h2><h2>' +
                    'Address:-</h2><h2>' + address + '</h2><h2>By our  store Partner :</h2><h2>' +
                    storeName + '</h2><br>'

        });
    }



module.exports=sendEmail;

