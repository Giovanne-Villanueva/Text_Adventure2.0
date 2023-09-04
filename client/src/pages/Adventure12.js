import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

import StoryChoice from '../components/StoryChoice'
import { useAdventureContext } from '../utils/GlobalState';

import {
  UPDATE_STORY,
  UPDATE_USER
} from '../utils/actions'
import { QUERY_FIRST_STORY, QUERY_STORY, QUERY_USER } from '../utils/queries'
import {UPDATE_USER_STORY} from '../utils/mutations'
import { idbPromise } from '../utils/helpers';

const Adventure = () => {
 const [state, dispatch] = useAdventureContext();
 
 
 const [currentStory, setCurrentStory] = useState({});

 const userData = useQuery(QUERY_USER);
 const [updateUserStory] = useMutation(UPDATE_USER_STORY);
 const [ getStory, {data, loading}] = useLazyQuery(QUERY_STORY);
 const [ getFirstStory, firstStory] = useLazyQuery(QUERY_FIRST_STORY);

 const {user, stories} = state;


 /*useEffect(()=>{
  idbPromise('stories', 'get').then((indexedStory) => {
    dispatch({
      type: UPDATE_STORY,
      stories: indexedStory,
    });
  })

  idbPromise('user', 'get').then((indexedUser) => {
    dispatch({
      type: UPDATE_USER,
      user: indexedUser,
    });
  })  
 },[]);*/
 //console.log(state)



//console.log(userData)
useEffect(() => {
  //console.log('I got here')
  if (Object.hasOwn(user, 'stories')){
    setStory(user.stories)
  }
  else if (userData.data) {
    dispatch({
      type: UPDATE_USER,
      user: userData.data.user
    })
    idbPromise('user', 'put', userData.data.user )
    setStory(userData.data.user.stories);
  }
  async function setStory(story){
    console.log(story)
    if(story._id){
      getStory({
        variables:{ _id: story._id }
      })
    }
    else{
      getFirstStory()
    }
  }
}, [user, userData.data] );


useEffect(() => {
  //console.log('I got here')
  //console.log(stories)
  if(Object.hasOwn(stories, '_id')){
    console.log("I got stories")
    setCurrentStory(stories)
  }
  else if( data ){
    console.log('I got sever story')
    dispatch({
      type: UPDATE_STORY,
      stories: data.story
    });
    idbPromise('stories', 'put', data.story)
  }
  else if (!loading) {
    idbPromise('stories', 'get').then((indexedStory) => {
      dispatch({
        type: UPDATE_STORY,
        stories: indexedStory,
      });
    });
  }
}, [ stories, data, loading, dispatch] );

const handleNextStory = async (next_tale) => {
  //console.log(next_tale)
  const mutationResponse = await updateUserStory({
    variables:{stories: next_tale._id}
  })
  console.log(mutationResponse)
  if(mutationResponse){
    dispatch({
      type: UPDATE_USER,
      user: mutationResponse.data.updateUserStory
    });

    idbPromise('user', 'put', (mutationResponse.data.updateUserStory));
  }
}


const makeChoices = ()=>{
  if(stories.choice.length){
    for(let i=0; i < stories.choice.length; i++){
      <button onClick={() => handleNextStory(stories.choice.next_tale)}>{stories.choice.option}</button>
    }
  }
}

  /*if(!stories.tale){
    return(
      <div>
        ...Loading
        
      </div>
    );
  }*/

  return(
    <div>
      <p>{currentStory.tale}</p>

      
      
    </div>
  );


};

export default Adventure;