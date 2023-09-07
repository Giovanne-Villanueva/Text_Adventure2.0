import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

import { useAdventureContext } from '../utils/GlobalState';
import StoryChoice from '../components/StoryChoice';

import {
  UPDATE_STORY,
  UPDATE_USER
} from '../utils/actions'
import { QUERY_FIRST_STORY, QUERY_STORY, QUERY_USER } from '../utils/queries';
import {UPDATE_USER_STORY, UPDATE_USER_CHARACTER} from '../utils/mutations'
import { idbPromise } from '../utils/helpers';


const Adventure = () => {
  const [state, dispatch] = useAdventureContext();

  const [currentStory, setCurrentStory] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  const userData = useQuery(QUERY_USER);
  const [getStory, {data, loading}] = useLazyQuery(QUERY_STORY);
  const [getFirstStory, story] = useLazyQuery(QUERY_FIRST_STORY)

  const [updateUserStory] = useMutation(UPDATE_USER_STORY);
  const [updateUserCharacter] = useMutation(UPDATE_USER_CHARACTER)

  const navigate = useNavigate();
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
    //console.log(data)
    if(data){
      dispatch({
        type: UPDATE_STORY,
        stories: data.story
      })
      idbPromise('stories', 'put', (data.story))
      setCurrentStory(data.story)
    }
  }, [stories, data, dispatch]);

  useEffect(()=>{
    
    if(user){
      //console.log(user)
      if(user.stories){
        setCurrentUser(user)
        if(user.stories._id){
          //console.log(user.stories)
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
      //firstStory(story.data.firstStory)
    }
    /*async function firstStory(next_tale){
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
    }*/
  }, [story.data, story.loading, dispatch])


  const handleNextStory = async (chosen) => {
    
    if(currentUser) {
      //console.log(chosen)
      switch(chosen.effect){
        case 'fight':
          //lose some healthpoints and determine wither you die or survive
          if(currentUser.user_stats.attack > 10 || (currentUser.user_stats.defense >10) || (currentUser.user_stats.agility) > 10 ){
            if( (currentUser.character.healthpoints + (currentUser.user_stats.hp))> 0 ) currentUser.user_stats.hp--;
          }
          else{
            if(currentUser.user_stats.defense > 10 ){
              currentUser.user_stats = currentUser.user_stats.hp - (10-currentUser.user_stats.defense);
            }
            else{
              currentUser.user_stats.defense = currentUser.user_stats.defense--;
            }
          }

          if((currentUser.character.healthpoints + currentUser.user_stats.hp) <= 0){
            return navigate('/ending');
          }
          break;

        case 'Positive':
          //gain a stat boost or gain equipment item to improve stats
          currentUser.user_stats.hp++;
          break;

        case 'negative':
          //lose either health points or an equipment item
          if(currentUser.equipment_id) currentUser.equipment_id = null;
          else currentUser.user_stats.hp--;
          break;
        default:
          console.log('nuteral');
          break;
      }
      const mutationResponse = await updateUserCharacter({
        variables:{user_stats: currentUser.user_stats._id}
      })
      
      const mutationStory = await updateUserStory({
        variables:{ stories: chosen.next_tale._id}
      })
      if(mutationStory){
        //console.log(mutationResponse)
        dispatch({
          type: UPDATE_USER,
          user: mutationStory.data.updateUserStory
        });
    
        idbPromise('user', 'put', (mutationStory.data.updateUserStory));
      }
      //console.log(user)
      //window.location.assign(url)
      //return navigate('/adventure',{replace:true});
     // return redirect('/adventure')
    }
  }

  const makechoices = ()=>{
    //console.log(currentStory)
    if(currentStory.choices){
      //console.log(currentStory)
      if(currentStory.choices.length){
        let length = currentStory.choices.length
        if(length === 1){
          return(
            <div  className='flex flex-col flex-wrap justify-between btn-grid w-full mx-2'>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[0])}>{currentStory.choices[0].option}</button>
            </div>
          );
        }
        else if(length ===2){
          return(
            <div  className='flex flex-col flex-wrap justify-between btn-grid w-full mx-2'>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[0])}>{currentStory.choices[0].option}</button>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[1])}>{currentStory.choices[1].option}</button>
            </div>
          );
        }
        else if(length === 3){
          return(
            <div  className='flex flex-col flex-wrap justify-between btn-grid w-full mx-2'>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[0])}>{currentStory.choices[0].option}</button>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[1])}>{currentStory.choices[1].option}</button>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[2])}>{currentStory.choices[2].option}</button>
            </div>
          );
        }
        else if(length === 4){
          return(
            <div  className='flex flex-col flex-wrap justify-between btn-grid w-full mx-2'>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[0])}>{currentStory.choices[0].option}</button>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[1])}>{currentStory.choices[1].option}</button>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[2])}>{currentStory.choices[2].option}</button>
              <button className='sm:w-10/12 p-2 rounded-md my-3 bg-cyan-700 btn' onClick={() => handleNextStory(currentStory.choices[2])}>{currentStory.choices[2].option}</button>
            </div>
          );
        }
      }
    }
  }

  //console.log(user)
  if(currentStory.choices){
    //console.log(currentStory)
    return(
      <div className='container mx-auto grid grid-cols-2 rounded-md my-10 p-2'>
        <p className='col-span-2 m-5'>{currentStory.tale}</p>
        <img className='ml-2 sm:ml-14 lg:ml-16 col-span-2 sm:col-span-1' src={`/images/${currentUser.characters.character_name}.jpg`} ></img>
        
          { /*currentStory.choices.map((choice) =>(
            <StoryChoice key={choice._id} choice={choice} player={user}/>
          ))*/}
          {makechoices()}
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