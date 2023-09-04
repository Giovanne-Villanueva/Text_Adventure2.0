import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CharacterCard from '../components/CharacterCard';

import { useAdventureContext } from '../utils/GlobalState';

import { QUERY_CHARACTERS } from '../utils/queries'


function NewCharacter() {
  const [state, dispatch] = useAdventureContext();
  const { id } = useParams();

  const [characterData, setCharacter] = useState([]);

  const { data, error } = useQuery(QUERY_CHARACTERS);

  const {characters} = state

  console.log(error)
  useEffect(() => {
    if(data){
      console.log(data)
      setCharacter(data.characters)
    }
  }, [ data ]);

  /*const addCharacter = () => {
    dd
  }*/

  return(
    <div>
      <h3>Choose A Character:</h3>
      {characterData.map((character) =>( 
        <CharacterCard key={character._id} character={character} />
      ))}
    </div>
  );
};

export default NewCharacter;