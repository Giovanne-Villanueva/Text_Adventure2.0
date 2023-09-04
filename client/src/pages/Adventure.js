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

  }, [userData.data, dispatch]);

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
        if(user.stories._id){
          getStory({
            variables:{_id:user.stories._id}
          })
        }
      }
      else if(user.name){
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
      <div>
        <p>{currentStory.tale}</p>
        { currentStory.choices.map((choice) =>(
          <StoryChoice key={choice._id} choice={choice} player={user}/>
        ))}
      </div>
    )
  }
  else if(currentStory){
    return(
      <div>...Loading</div>
    )
  }
  return(
    <div>
      <p>{currentStory.tale}</p>
    </div>
  )
}

export default Adventure;