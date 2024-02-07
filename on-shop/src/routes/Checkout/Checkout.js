import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../../components/ChecoutForm/CheckoutForm';

import './Checkout.css';

const stripe = loadStripe('pk_test_1b7TDT5I1aLlj6UAhEejbqrh');

function Checkout() {
    return (
        <Elements stripe={stripe}>
            <div className='checkout-from'>
                <CheckoutForm />
            </div>
        </Elements>
    );
}

export default Checkout;