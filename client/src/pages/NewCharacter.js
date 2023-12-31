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
      <h2 className='text-base sm:text-xl md:text-2xl my-1' >Choose A Character:</h2>
      <div className='grid grid-cols-2 gap-2 justify-center content-center mt-2 md:flex-row'>
      {characterData.map((character) =>( 
        <CharacterCard key={character._id} character={character} />
      ))}
      </div>
    </div>
  );
};

export default NewCharacter;