const stripe = require('stripe')('sk_test_51Ni6hkDivUUAA9SwJSng7BgvzVOfcNQe0tMJ1x3QluM7iFD4eH7DvflcF9IrlGhVVInyrCeL7Jl1bPbNaBTm1xqY001OnQKfMX')
const resolvers = {
    Mutation: {
        processPayment: async(_, {amount}) => {
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: amount,
                    currency: 'usd',
                });

                return {
                    success: true,
                    paymentIntentID: paymentIntent.id,
                };
            } catch (error) {
                console.error(error);
                return {
                    success: false,
                    error: error.message,
                };
            }
        },
    },
   
    };

   

module.exports = resolvers