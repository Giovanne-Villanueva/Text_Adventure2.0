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
    <div>
        <div>
          <h3>
            <img />
            {character.character_name}
          </h3>
          <ul>
          <li >Characters Starting healthpoints: {character.healthpoints}</li>
          <li >Hp Stat: {character.ch_stats.hp}</li>
          <li >Attack Stat: {character.ch_stats.attack}</li>
          <li >Defense Stat: {character.ch_stats.defense}</li>
          <li >Agility Stat: {character.ch_stats.agility}</li>
        </ul>
        <button  onClick={() => chosenCharacter(character)}  type="button">Choose</button>
        </div>
    </div>
  );
}

export default CharacterCard;