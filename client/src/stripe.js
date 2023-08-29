document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById('payment-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = parseInt(document.getElementById('donation-amount').value);

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
            console.log('Payment successful', responseData.data.processPayment.paymentIntentID);
        } else {
            console.error('Payment error:', responseData.data.processPayment.error);
        }
    });
});