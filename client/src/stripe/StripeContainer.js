import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../stripe/CheckoutForm';

const stripePromise = loadStripe("pk_test_51LQHEAKW4l2PB10O8AueaLKiHrGSsmNgZL5St0BozlGbCtiFHhT1xmlX5JX0v5h9LpV0yvFWpZRXh5eAHtN35wZn000rOp1taJ");

const StripeContainer = () => {
    
    const appearance = {
        theme: 'night',
        labels: 'floating'
    };
    return (
        <Elements stripe={stripePromise} options={appearance}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeContainer;