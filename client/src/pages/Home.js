import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      
      <header className="flex flex-col">
        <h1 className="m-5 text-center  text-lg sm:text-2xl md:text-5xl">Better Text Adventure</h1>
      </header>
      
      <p className="mx-2 indent-1 sm:indent-10 md:indent-24 lg:mx-32 lg:indent-32">
      Text Adventure is a fun short text type of game where you will be able to experiance four different stories. Each story is unique with different outcomes based on user choices. Users' will also be able to pick a character to go through each story which does affect the outcome of each story ending. Stories can end quickly if not carfull when making choices. While adventuring users can aquire equipment or items to help them in their journey. Now with that being said ready to Start your journey.
      </p>
      <div class="options flex justify-center start">
        <Link to="/signup" className="container w-1/5 p-2 rounded-md bg-cyan-700 text-center text-white mr-5 mt-5 sm:mr-10 md:mr-20 lg:mr-40">Begin a new Adventure</Link>
        <Link to="/login" className="container w-1/5 p-2 rounded-md bg-cyan-700 text-center text-white ml-5 mt-5 sm:ml-10 md:ml-20 lg:ml-40">Welcome Back</Link>
      </div>
    </div>
  );
};

export default Home;
