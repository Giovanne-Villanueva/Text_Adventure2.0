import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Donations from './Components/Donations'; // Make sure to import your Donations component
import './App.css';


const stripePromise = loadStripe('pk_test_51Ni6hkDivUUAA9Sw4ywYxKtI1SlrO9vjzzxoRX5nKG6JhTAV9dJhdQT5yDInrJFYnrE4re5GAkpqIWcJcdJPJ3J700eDAigjpN');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Your header content */}
      </header>
      <main>
        <Elements stripe={stripePromise}>
          <Donations />
        </Elements>
      </main>
    </div>
  );
}

export default App;

