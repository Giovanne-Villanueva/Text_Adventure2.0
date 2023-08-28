import { useReducer } from 'react';

import {
  DELETE_CHARACTER,
  UPDATE_USER
} from './actions'

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: [...action.user]
      };
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