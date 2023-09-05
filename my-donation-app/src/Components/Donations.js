

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Donations.css"

const Donations = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false); // State to track payment success

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
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
    }
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
      <div className="form-group">
        <label>Card Details</label>
        <CardElement className="card-element" />
      </div>
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Donate"}
      </button>
    </form>

    {paymentSucceeded && (
      <div className="success-message">
        <p>Thank you for your donation!</p>
        
      </div>
    )}
  </div>
);
};

export default Donations;
