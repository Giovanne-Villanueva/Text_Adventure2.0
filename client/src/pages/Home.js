import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      
      <header>
        <h1>Better Text Adventure</h1>
      </header>
      
      <p>
      Text Adventure is a fun short text type of game where you will be able to experiance four different stories. Each story is unique with different outcomes based on user choices. Users' will also be able to pick a character to go through each story which does affect the outcome of each story ending. Stories can end quickly if not carfull when making choices. While adventuring users can aquire equipment or items to help them in their journey. Now with that being said ready to Start your journey.
      </p>
      <div class="options">
        <Link to="/signup">Begin a new Adventure</Link>
        <Link to="/login">Welcome Back</Link>
      </div>
    </div>
  );
};

export default Home;
