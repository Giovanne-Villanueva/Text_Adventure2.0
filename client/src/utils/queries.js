import { gql } from '@apollo/client';

export const QUERY_STORY = gql`
  query getStory($_id: ID!) {
    story(_id: $_id) {
      _id
      tale
      choices {
        _id
        effect
        option
        next_tale {
          _id
        }
      }
    }
  }
`;

export const QUERY_FIRST_STORY =gql`
  {
    firstStory {
      _id
      tale
      choices {
        _id
        option
        effect
        next_tale {
          _id
        }
      }
    }
  }
`;

export const QUERY_CHARACTERS = gql`
  {
    characters {
      _id
      character_name
      healthpoints
      ch_stats {
        _id
        agility
        attack
        defense
        hp
      }
    }
  }
`;

export const QUERY_CHARACTER = gql`
  query getCharacter($character: ID!) { 
    character(character: $character) {
      _id
      character_name
      healthpoints
      ch_stats {
        _id
        agility
        attack
        defense
        hp
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
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
        defense
        agility
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($price: Int) {
    checkout(donationPrice: $price) {
      session
    }
  }
`;