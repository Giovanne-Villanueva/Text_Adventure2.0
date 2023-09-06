import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        name: formState.name,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if(Auth.loggedIn()){
    return(
      <Navigate to="/dashboard" replace={true}/>
    );
  }

  return (
    <div className="container flex flex-wrap flex-col justify-center content-center">
      
      {}
      <h2 className='my-2 text-center text-base sm:text-xl'>Signup</h2>
      <form className='form w-5/6 md:w-1/2 xl:w-1/3' onSubmit={handleFormSubmit}>
        <div className="w-full rounded-t-md border-t-2 border-x-2 border-black">
          <label className='py-3 px-1 border-r-2 border-black text-sm md:text-base block md:inline-block w-3/12 xl:w-1/5' htmlFor="name">User Name:</label>
          <input
            className='w-full md:w-8/12 xl:w-4/6 px-1'
            placeholder="username"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="w-full border-t-2 border-x-2 border-black">
          <label className='py-3 px-1 border-r-2 border-black text-sm md:text-base block md:inline-block w-3/12 xl:w-1/5' htmlFor="email">Email:</label>
          <input
            className='w-full md:w-8/12 xl:w-4/6 px-1'
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="w-full rounded-b-md border-2 border-black">
          <label className='py-3 px-1 border-r-2 border-black text-sm md:text-base block md:inline-block w-3/12 xl:w-1/5' htmlFor="pwd">Password:</label>
          <input
            className='w-full md:w-8/12 xl:w-4/6 px-1'
            placeholder="********"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className='w-full p-2 rounded-md my-3 bg-cyan-700 text-center text-white' type="submit">Submit</button>
        </div>
      </form>
      <Link className='text-center w-5/6 md:w-1/2 xl:w-1/3 p-2 my-3 rounded-md bg-cyan-700 text-white' to="/login">← Go to Login</Link>
    </div>
  );
}

export default Signup;
