import React from "react";
import { Link } from 'react-router-dom';

const Ending = () => {
  return(
    <div className="flex flex-col flex-wrap justify-center content-center">
      <h2 className="text-center text-base sm:text-xl md:text-2xl my-3 ">End of the Road</h2>
      <p className="text-center mx-2"> You have made it to the end of our game at this point you can return to your dashboard to begin a new or logout. </p>
      <Link className="text-center w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2 rounded-md my-3 mx-56 bg-cyan-700" to="/dashboard">home</Link>
    </div>
  );
}

export default Ending;