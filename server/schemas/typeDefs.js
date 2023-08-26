const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    stories: [Story]
    equipment_id: [Equipment]
    character: [Character]
  }

  type Character {
    _id: ID
    character_name: String
    healthpoints: Int
    ch_stats: Stats
  }

  type Stats {
    _id: ID
    hp: Int
    attack: Int
    defense: Int
    agility: Int
  }

  type Equipment {
    _id: ID
    equipment_name: String
    ability: String
    eq_stats: Stats
  }

  type Story {
    _id: ID
    tale: String
    choices: [Choice]
    next_tale: [Story]
  }

  type Choice {
    _id: ID
    option: String
    effect: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    characters: [Character]
    character: Character
    equipments: [Equipment]
    equipment: Equipment
    story: Story
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    updateUser(name: String, email: String, password: String, stories:[ID], equipment_id:[ID], characters: [ID]):User
    addcharacter(character_name: String!, healthpoints: Int, ch_stats: ID):Character
    removeCharacter(characterId: ID!):Character
    updateCharacter(characterId: ID!, character_name: String, healthpoints: Int, ch_stats: ID):Character
    addStats(hp: Int!, attack: Int!, defense: Int!, agility: Int!):Stats
    removeStats(statsId: ID!):Stats
    updateStats(statsId: ID!, hp: Int, attack: Int, defense: Int, agility: Int):Stats
    addStory(tale: String!, choices: [ID]!, next_tale: [ID]!):Story
    removeStory(storyId: ID!):Story
    updateStory(storyId: ID!, tale: String, choices: [ID]!, next_tale: [ID]):Story
    addEquipment(equipment_name: String!, ability: String!, eq_stats: ID):Equipment
    removeEquipment(equipmentId: ID!):Equipment
    updateEquipment(equipmentId: ID!, equipment_name: String, ability: String, eq_stats: ID):Equipment
    addChoice(option: String!, effect: String!):Choice
    removeChoice(choiceId: ID!):Choice
    updateChoice(choiceId: ID!, option: String, effect: String):Choice
    login(email: String!, password: String!): Auth
  }

`;

module.exports = typeDefs;