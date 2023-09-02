const { default: Stripe } = require("stripe");

document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById('payment-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = parseInt(document.getElementById('donation-amount').value);

        const stripe = Stripe('pk_test_51Ni6hkDivUUAA9Sw4ywYxKtI1SlrO9vjzzxoRX5nKG6JhTAV9dJhdQT5yDInrJFYnrE4re5GAkpqIWcJcdJPJ3J700eDAigjpN');
        const response = await fetch ('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                mutation ProcessPayment($amount: INT!) {
                    processPayment(amount: $amount) {
                        success
                        paymentIntentID
                        error
                    }
                }
                `,
                variables: {
                    amount: amount,
                },
            }),
        });
        const responseData = await response.json();

        if (responseData.data.processPayment.success) {
            const paymentIntent = responseData.data.processPayment.paymentIntentID;

            const { error } = await stripe.redirectToCheckout({
                sessionID: paymentIntent
            });
            if (error) {
                console.error('Error redirecting to Stripe checkout:', error);
            }
        } else {
            console.error('Payment error:', responseData.data.processPayment.error);
        }
    });
});