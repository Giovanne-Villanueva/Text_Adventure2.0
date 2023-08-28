import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const { id } = useParams();

  const [userData, setUserData] = useState({});

  const { loading, data } = useQuery(QUERY_USER);

  const {characters, stories, user} = state

  useEffect(() => {
    if(user.name){
      setUserData(user.findById(id) );
    }
    else if (data) {
      dispatch({
        type: UPDATE_USER,
        user: data.user
      });

      data.user((user) => {
        idbPromise('user', 'put', user);
      });
    }
    else if (!loading) {
      idbPromise('user', 'get').then((indexedUser) => {
        dispatch({
          type: UPDATE_USER,
          products: indexedUser,
        });
      });
    }
  }, [user, data, loading, dispatch, id]);

  const deleteChracter = () => {
    dispatch({
      type: DELETE_CHARACTER,
      _id: userData.characters._id
    });
    idbPromise('characters', 'delete', {...(userData.characters)})
  }


  return(
  <div>
    <h2>Welcome, {user.name}!</h2>
    <div>
      <h3>Current Adventuer</h3>
      <div>
        <img></img>
        <Link to={`/adventuer/${user.stories._id}`} className='continue'>Continue</Link>
        <button className='delete' onClick={deleteChracter}>Delete</button>
      </div>
    </div>
    <p>Just a warning if you begin a new story your current saved story will be lost</p>
    
  </div>
  );
};

export default Dashboard;