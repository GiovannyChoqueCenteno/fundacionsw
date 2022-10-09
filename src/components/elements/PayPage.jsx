import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Pay from "./Pay.jsx";

const stripePromise = loadStripe("pk_test_51K4spRGtyN68xBAjFJ2oqY1tjcb4B7ATKTfFYWxCAlEKzlZrzLLmsFe5um4fOxcwm1omz6X8ysZAkMpm1qrUwlum00FYVkizBD");


function PayPage(props) {
    return (
        <Elements stripe={stripePromise}>
            <Pay {...props}></Pay>
        </Elements>
    );
}

export default PayPage;