import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useAdventureContext } from '../utils/GlobalState';
import {
  UPDATE_USER,
  DELETE_CHARACTER
} from '../utils/actions'
import { QUERY_USER } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

const Dashboard = () => {
  const [state, dispatch] = useAdventureContext();

  const [userData, setUserData] = useState({});

  const {loading, data } = useQuery(QUERY_USER);

  const {user} = state


  useEffect(() => {
    if(Object.hasOwn(state.user, 'name') ){
      //console.log('I got here')
      //console.log(user)
      setUserData(user);
    }
    else if (data) {
      dispatch({
        type: UPDATE_USER,
        user: data.user
      });

      idbPromise('user', 'put', (data.user));
    }

  }, [state.user, data, dispatch]);

  const deleteCharacter = () => {
    dispatch({
      type: DELETE_CHARACTER,
      _id: userData.characters._id
    });
    idbPromise('characters', 'delete', userData.characters)
  }

  const continueAdventure = () => {
    
    if(user){
      console.log(user)
      if(user.stories){
        return(
          <div>
            <h3>Current Adventuer</h3>
            <img></img>
            <Link to={`/adventure`} className='continue'>Continue</Link>
            <button className='delete' onClick={deleteCharacter}>Delete</button>
          </div>
        )
      }
      
    }
  }


  return(
  <div>
    <h2>Welcome, {user.name}!</h2>
      
    {continueAdventure()}

    <p>Just a warning if you begin a new story your current saved story will be lost</p>
    <Link to={"/newCharacter"}>Start a new Adventuer</Link>

  </div>
  );
};

export default Dashboard;