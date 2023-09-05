import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'
import NewCharacter from './pages/NewCharacter'
import Adventure from './pages/Adventure';
import Header from './components/Header';
import Donations from './components/Donations/Donations';
import { AdventureProvider } from './utils/GlobalState';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return(
    <ApolloProvider client={client}>
        <Router>
          <div>
            <Header />
            <AdventureProvider>
              <Routes>
                <Route
                  path="/"
                  element={<Home />} 
                />
                <Route
                  path="/dashboard"
                  element={<Dashboard />} 
                />
                <Route
                  path="/newCharacter"
                  element={<NewCharacter />} 
                />
                <Route
                  path="/adventure"
                  element={<Adventure />} 
                />
                <Route
                  path="/login"
                  element={<Login />} 
                />
                <Route
                  path="/signup"
                  element={<Signup />} 
                />
                <Route
                  path="/donations"
                  element={<Donations />} 
                />
              </Routes>
            </AdventureProvider>
          </div>
        </Router>
    </ApolloProvider>
  );
};

export default App;
