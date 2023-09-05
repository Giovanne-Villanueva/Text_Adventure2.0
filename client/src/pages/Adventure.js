import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

import { useAdventureContext } from '../utils/GlobalState';
import StoryChoice from '../components/StoryChoice';

import {
  UPDATE_STORY,
  UPDATE_USER
} from '../utils/actions'
import { QUERY_FIRST_STORY, QUERY_STORY, QUERY_USER } from '../utils/queries';
import {UPDATE_USER_STORY} from '../utils/mutations'
import { idbPromise } from '../utils/helpers';


const Adventure = () => {
  const [state, dispatch] = useAdventureContext();

  const [currentStory, setCurrentStory] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  const userData = useQuery(QUERY_USER);
  const [getStory, {data, loading}] = useLazyQuery(QUERY_STORY);
  const [getFirstStory, story] = useLazyQuery(QUERY_FIRST_STORY)

  const [updateUserStory] = useMutation(UPDATE_USER_STORY);

  const {user, stories}=state;
  
  useEffect(()=>{
    
  
    if (userData.data) {
      dispatch({
        type: UPDATE_USER,
        user: userData.data.user
      });

      idbPromise('user', 'put', (userData.data.user));
    }

  }, [user, userData.data, dispatch]);

  useEffect(()=>{
    if(stories._id){
      //console.log(stories)
      setCurrentStory(stories)
    }
    else if(data){
      dispatch({
        type: UPDATE_STORY,
        stories: data.story
      })
      idbPromise('stories', 'put', (data.story))
    }
  }, [stories, data, dispatch]);

  useEffect(()=>{
    
    if(user){
      if(user.stories){
        setCurrentUser(user)
        if(user.stories._id){
          getStory({
            variables:{_id:user.stories._id}
          })
        }
      }
      else if(user.name){
        setCurrentUser(user)
        getFirstStory();
      }
    }
  }, [user, getStory, getFirstStory]);

  useEffect(()=>{
    if(story.data){
      dispatch({
        type: UPDATE_STORY,
        stories: story.data.firstStory
      })
      idbPromise('stories', 'put', (story.data.firstStory))
      firstStory(story.data.firstStory)
    }
    async function firstStory(next_tale){
      const mutationResponse = await updateUserStory({
        variables:{stories: next_tale._id}
      })
      if(mutationResponse){
        dispatch({
          type: UPDATE_USER,
          user: mutationResponse.data.updateUserStory
        });
    
        idbPromise('user', 'put', (mutationResponse.data.updateUserStory));
      }
    }
  }, [story.data, story.loading, dispatch, updateUserStory])


  //console.log(user)
  if(currentStory.choices){
    //console.log(currentStory.choices)
    return(
      <div className='container mx-auto grid grid-cols-2 rounded-md my-10 p-2'>
        <p className='col-span-2 m-5'>{currentStory.tale}</p>
        <img className='ml-2 sm:ml-14 lg:ml-16 col-span-2 sm:col-span-1' src={`/images/${currentUser.characters.character_name}.jpg`} ></img>
        <div className='flex flex-col flex-wrap justify-between btn-grid w-full mx-2'>
          { currentStory.choices.map((choice) =>(
            <StoryChoice key={choice._id} choice={choice} player={user}/>
          ))}
        </div>
      </div>
    )
  }
  else if(currentStory){
    return(
      <div>...Loading</div>
    )
  }
  return(
    <div className='container mx-auto grid grid-cols-2 rounded-md my-10 p-2'>
      <p className='col-span-2 m-5'>{currentStory.tale}</p>
      <img className='ml-2 sm:ml-14 lg:ml-16 col-span-2 sm:col-span-1'></img>
    </div>
  )
}

export default Adventure;