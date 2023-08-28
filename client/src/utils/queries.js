import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      name
      stories {
        _id
        tale
        choices {
          _id
          option
          effect
        }
        next_tale {
          _id
        }
      }
      equipment_id {
        _id
        equipment_name
        ability
        eq_stats {
          _id
          hp
          attack
          defense
          agility
        }
      }
      characters {
        _id
        character_name
        healthpoints
        ch_stats {
          _id
          hp
          attack
          defense
          agility
        }
      }
    }
  }
`;