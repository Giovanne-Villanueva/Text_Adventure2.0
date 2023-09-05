import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
//import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import Auth from '../../utils/auth';
import "./Donations.css"

const stripePromise = loadStripe('pk_test_51Ni6hkDivUUAA9Sw4ywYxKtI1SlrO9vjzzxoRX5nKG6JhTAV9dJhdQT5yDInrJFYnrE4re5GAkpqIWcJcdJPJ3J700eDAigjpN');

const Donations = () => {

  const [amount, setAmount] = useState("");
  const [getCheckout, {data}] =useLazyQuery(QUERY_CHECKOUT);
  //const [loading, setLoading] = useState(false);
  //const [paymentSucceeded, setPaymentSucceeded] = useState(false); // State to track payment success

useEffect(()=>{
  if (data) {
    stripePromise.then((res) => {
      res.redirectToCheckout({ sessionId: data.checkout.session });
    });
  }
}, [data])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let price = Number(amount)
    getCheckout({
      variables:{price: price}
    })
    /*if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);

    
    const response = await fetch("http://localhost:3001/create-payment-intent ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();

    
    if (data.error) {
      console.error(data.error);
      setLoading(false);
      return;
    }

    // Confirm the payment on the client
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Include billing details if needed.
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
      setLoading(false);
    } else {
      // Payment successful
      setLoading(false);
      setPaymentSucceeded(true);
      console.log("Payment succeeded:", result.paymentIntent);
      // Display a success message to the user
    }*/
  };

  return (
    
    <div className="donations-container">
    <h2>Make a Donation</h2>
    <div className="donation-purpose">
      <p>Your donations make a difference!</p>
      <p>
        All donations go toward creating new content and enhancing the
        experience of our text adventure game.
      </p>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="amount">Donation Amount ($)</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      {Auth.loggedIn() ? (
        <button className='text-center w-5/6 md:w-1/2 xl:w-1/3 p-2 my-3 rounded-md bg-cyan-700 text-white' type="submit" >Checkout</button>
      ) : (
        <Link to="/login" >(log in to Donate)</Link>
      )}
    </form>
  </div>
);
};

export default Donations;