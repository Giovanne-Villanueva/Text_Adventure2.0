const stripe = require('stripe')('sk_test_51Ni6hkDivUUAA9SwJSng7BgvzVOfcNQe0tMJ1x3QluM7iFD4eH7DvflcF9IrlGhVVInyrCeL7Jl1bPbNaBTm1xqY001OnQKfMX')
const resolvers = {
  
    Query: {
        checkout: async (parant, context) => {
        const session = await stripe.checkout.create({
        payment_methods_types: ['card'],
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
        })
    }
    }
};

module.exports = resolvers