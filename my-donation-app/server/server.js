const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Ni6hkDivUUAA9SwJSng7BgvzVOfcNQe0tMJ1x3QluM7iFD4eH7DvflcF9IrlGhVVInyrCeL7Jl1bPbNaBTm1xqY001OnQKfMX");

const app = express();
const port = 3001; 

app.use(express.json());

app.use(cors());


app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
