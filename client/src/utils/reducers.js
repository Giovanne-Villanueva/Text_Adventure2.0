import { useReducer } from 'react';

import {
  DELETE_CHARACTER,
  ADD_CHARACTER,
  UPDATE_USER,
  UPDATE_STORY
} from './actions'

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      };
    case ADD_CHARACTER: 
      return {
        ...state,
        user: 
          {
            ...state.user,
            characters: action.characters._id
          } ,
        characters: action.characters
      }
      case UPDATE_STORY: 
      return {
        ...state,
        stories: action.stories
      }
    case DELETE_CHARACTER:
      return{
        ...state,
        characters:{}
      }
    default:
      return state;
  }
};

export function useUserReducer(initialState) {
  return useReducer(reducer, initialState);
}