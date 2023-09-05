import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import { createRoot } from 'react-dom/client';

//const domNode = document.getElementById('root');
//const root = createRoot(domNode)
//root.render(<App />);
/*ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render( 
  <React.StrictMode>
  <App />
  </React.StrictMode>,
)*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);