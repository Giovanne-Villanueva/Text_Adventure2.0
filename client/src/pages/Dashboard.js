import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery , useMutation} from '@apollo/client';

import { useAdventureContext } from '../utils/GlobalState';
import {
  UPDATE_USER,
  DELETE_CHARACTER
} from '../utils/actions'
import { QUERY_USER } from '../utils/queries';
import { EDIT_USER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

const Dashboard = () => {
  const [state, dispatch] = useAdventureContext();

  const [userData, setUserData] = useState({});

  const {loading, data } = useQuery(QUERY_USER);
  const [ editUser ] = useMutation(EDIT_USER)

  const {user} = state


  useEffect(() => {
    if(user){
      if(user.name){
        //console.log('I got here')
        //console.log(user)
        setUserData(user);
      }
      else if(data){
        dispatch({
          type: UPDATE_USER,
          user: data.user
        });
  
        idbPromise('user', 'put', (data.user));
        return
      }
    }
    else if (data) {
      dispatch({
        type: UPDATE_USER,
        user: data.user
      });

      idbPromise('user', 'put', (data.user));
      return
    }

  }, [ user, data, dispatch]);

  const deleteCharacter = async () => {
    if(user.characters){
      const mutationResponse = await editUser({
        variables:{ stories:null, equipment:null, characters:null, user_stats:null}
      })
      if(mutationResponse){
        console.log(mutationResponse)
        dispatch({
          type: UPDATE_USER,
          user: mutationResponse.data.updateUser
        });
  
        idbPromise('user', 'put', (mutationResponse.data.updateUser))
      }
      setUserData(user)
    }
  }

  const continueAdventure = () => {
    
    if(userData){
      //console.log(userData)
      if(userData.stories){
        return(
          <div>
            <h3>Current Adventuer</h3>
            <img></img>
            <Link to={`/adventure`} className='continue w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2 rounded-md my-3 mr-2 bg-cyan-700'>Continue</Link>
            <button className='delete w-full sm:w-max p-2 rounded-md my-3 mx-2 bg-cyan-700' onClick={deleteCharacter}>Delete</button>
          </div>
        )
      }
      
    }
  }

  if(!userData){
    return(
      <div>... Loading</div>
    )
  }

  return(
  <div className='flex flex-wrap flex-col ml-4'>
    <h2 className='text-center text-base sm:text-xl md:text-2xl'>Welcome, {userData.name}!</h2>
      
    {continueAdventure()}

    <p className="text-base sm:text-xl md:text-xl mt-10">Just a warning if you begin a new story your current saved story will be lost</p>
    <Link className='sm:w-1/2 md:w-max xl:w-fit p-2 rounded-md my-3 bg-cyan-700' to={"/newCharacter"} onClick={deleteCharacter}>Start a new Adventuer</Link>

  </div>
  );
};

export default Dashboard;