//core libraries
const path = require('path');

//3rd party libs
const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');



if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);//this must be below require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//to make sure the urls we are passing in and out dont contain things like spaces, and unwanted symbols

app.use(cors());

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));//makes it possible to serve the static react files

    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}

app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Server running on post ${port}.`);
});

app.post('/payment', (req, res) => {

    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr){
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });

        }
    })
});