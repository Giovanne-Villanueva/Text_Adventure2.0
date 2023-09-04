import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useAdventureContext } from '../utils/GlobalState';

import {
  ADD_CHARACTER, UPDATE_USER
} from '../utils/actions'
import  { QUERY_USER } from '../utils/queries'
import { UPDATE_USER_CHARACTER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers'

function StoryChoice ({choice}, player) {
  const [state, dispatch] = useAdventureContext();


  const { user } = state;
  

  useEffect(()=>{
    if(player.user){
      idbPromise('user', 'getSingle', {name: player.user.name}).then((indexedUser) => {
        dispatch({
          type:UPDATE_USER,
          user: indexedUser
        })
      })
    }
  }, [player, dispatch])

  const handleNextStory = async (chosen) => {
    
    if(user) {
      console.log(user.user_stats)
      switch(chosen.effect){
        case 'fight':
          //lose some healthpoints and determine wither you die or survive
          if(user.user_stats.attack > 10 || (user.user_stats.defense >10) || (user.user_stats.agility) > 10 ){
            if( (user.character.healthpoints + (user.user_stats.hp))> 0 ) user.user_stats.hp--;
          }
          else{
            if(user.user_stats.defense > 10 ){
              user.user_stats = user.user_stats.hp - (10-user.user_stats.defense);
            }
            else{
              user.user_stats.defense = user.user_stats.defense--;
            }
          }

          if((user.character.healthpoints + user.user_stats.hp) <= 0){
            document.location.assign(`/ending`)
          }
          break;

        case 'Positive':
          //gain a stat boost or gain equipment item to improve stats
          user.user_stats.hp++;
          break;

        case 'negative':
          //lose either health points or an equipment item
          if(user.equipment_id) user.equipment_id = null;
          else user.user_stats.hp--;
          break;
      }
    }
  }
  console.log(user)
  return(
    <div> 
      <button onClick={() => handleNextStory(choice)}>{choice.option}</button>
    </div>
  );

}

export default StoryChoice;