import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER_CHARACTER = gql`
  mutation addUserCharacter(
    $characters:ID!,
    $user_stats:ID!
  ) {
    addUserCharacter(
      characters: $characters,
      user_stats: $user_stats
    ){
      name
      characters {
        _id
      }
    }
  }
`;

export const UPDATE_USER_STORY = gql`
  mutation updateUserStory(
    $stories: ID!
  ) {
    updateUserStory(
      stories: $stories
    ){
      name
      stories {
        _id
      }
      equipment_id {
        _id
        equipment_name
        ability
      }
      characters {
        _id
        character_name
        healthpoints
      }
      user_stats{
        _id
        hp
        attack
        agility
        defense
      }
    }
  }
`;

export const UPDATE_USER_CHARACTER = gql`
  mutation updateUserCharacter (
    $user_stats: ID!
  ){
    updateUserCharacter(
      user_stats: $user_stats
    ){
      name
      stories {
        _id
      }
      equipment_id {
        _id
        equipment_name
        ability
      }
      characters {
        _id
        character_name
        healthpoints
      }
      user_stats{
        _id
        hp
        attack
        agility
        defense
      }
    }
  }
`;

export const EDIT_USER =gql`
  mutation updateUser(
    $stories:ID, 
    $equipment_id:ID, 
    $characters: ID
  ) {
    updateUser(
      stories: $stories, 
      equipment_id: $eqipment_id, 
      characters: $characters
    ) {
      name
      stories {
        _id
      }
      equipment_id {
        _id
        ability
        equipment_name
      }
      characters {
        _id
        character_name
        healthpoints
      }
      user_stats{
        _id
        hp
        attack
        agility
        defense
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $name: String!,
    $email: String!,
    $password: String!
  ) {
    addUser(
      name: $name,
      email: $email,
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;