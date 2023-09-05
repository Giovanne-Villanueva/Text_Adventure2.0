const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    stories: Story
    equipment_id: [Equipment]
    characters: Character
    user_stats: Stats
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
    first: Boolean
  }

  type Choice {
    _id: ID
    option: String
    effect: String
    next_tale: Story
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    characters: [Character]
    character( _id: ID!): Character
    equipments: [Equipment]
    equipment( _id: ID!): Equipment
    firstStory: Story
    stories: [Story]
    story( _id: ID!): Story
    checkout(donationPrice: Int): Checkout
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    updateUser(name: String, email: String, password: String, stories:ID, equipment:ID, characters: ID, user_stats: ID):User
    addUserCharacter(characters: ID!, user_stats:ID!):User
    updateUserStory(stories: ID!):User
    updateUserCharacter(user_stats: ID!):User
    addCharacter(character_name: String!, healthpoints: Int, ch_stats: ID):Character
    removeCharacter(characterId: ID!):Character
    updateCharacter(characterId: ID!, healthpoints: Int):Character
    addStats(hp: Int!, attack: Int!, defense: Int!, agility: Int!):Stats
    removeStats(statsId: ID!):Stats
    updateStats(statsId: ID!, hp: Int, attack: Int, defense: Int, agility: Int):Stats
    addStory(tale: String!, choices: [ID], first:Boolean):Story
    removeStory(storyId: ID!):Story
    updateStoryChoices(storyId: ID!, tale: String, choices: [ID]):Story
    addEquipment(equipment_name: String!, ability: String!, eq_stats: ID):Equipment
    removeEquipment(equipmentId: ID!):Equipment
    updateEquipment(equipmentId: ID!, equipment_name: String, ability: String, eq_stats: ID):Equipment
    addChoice(option: String!, effect: String!, next_tale:ID):Choice
    removeChoice(choiceId: ID!):Choice
    updateChoice(choiceId: ID!, option: String, effect: String, next_tale:ID):Choice
    login(email: String!, password: String!): Auth
  }

`;

module.exports = typeDefs;