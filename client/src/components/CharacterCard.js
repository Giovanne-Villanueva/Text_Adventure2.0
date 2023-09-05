import React from 'react';
import { useMutation } from '@apollo/client';
import { useAdventureContext } from '../utils/GlobalState';

import {
  ADD_CHARACTER
} from '../utils/actions'
import { ADD_USER_CHARACTER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers'

function CharacterCard ({ character }) {

  const [state, dispatch] = useAdventureContext();

  const [editUser] = useMutation(ADD_USER_CHARACTER);

  const chosenCharacter = async (chosen) => {

    dispatch({
      type: ADD_CHARACTER,
      characters: chosen
    });

    idbPromise('characters', 'put', chosen )

    const mutationResponse = await editUser({
      variables: {
        characters: chosen._id,
        user_stats: chosen.ch_stats._id
      }
    });

    //console.log(mutationResponse)
    window.location.assign('/adventure')
  }

  return (
    <div className='flex flex-col flex-wrap justify-center content-center mt-2 md:flex-row'>
        <div className='flex flex-col content-center md:w-2/6 md:mx-6'>
          <h2>
            <img src={`/images/${character.character_name}.jpg`} />
            {character.character_name}
          </h2>
          <ul className='flex flex-col text-sm sm:text-base md:text-lg'>
            <li className='block w-full'>Characters Starting healthpoints: {character.healthpoints}</li>
            <li className='block w-full'>Hp Stat: {character.ch_stats.hp}</li>
            <li className='block w-full'>Attack Stat: {character.ch_stats.attack}</li>
            <li className='block w-full'>Defense Stat: {character.ch_stats.defense}</li>
            <li className='block w-full'>Agility Stat: {character.ch_stats.agility}</li>
        </ul>
        <button className='w-full p-2 my-4 rounded-md bg-cyan-700' onClick={() => chosenCharacter(character)}  type="button">Choose</button>
        </div>
    </div>
  );
}

export default CharacterCard;