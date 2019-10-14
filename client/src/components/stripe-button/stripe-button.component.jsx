import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_LstEyN0gzeApEwMWQpyhAiYS00niBQu1Hn';

    const onToken = token => {
        console.log(token);
        // alert('Success!');
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then((response)  => {
            console.log(response);
            alert('Success!');
        }).catch((err) => {
            console.log('Error in stripe - ', JSON.parse(err));
            alert('Fail!');
        });
        
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crown CLothing'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is ${price}.`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;