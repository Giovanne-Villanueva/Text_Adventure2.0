const { AuthenticationError } = require('apollo-server-express');
const { User, Character, Story, Stats, Choice, Equipment} = require('../models');
const { signToken } = require('../utils/auth');
const { populate } = require('../models/User');
const { default: mongoose } = require('mongoose');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if(context.user) {
        const user = await User.findById(context.user._id).populate('stories').
        populate('equipment').
        populate('characters').
        populate('user_stats');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    characters: async () => {
      return await Character.find({}).populate('ch_stats');
    },
    character: async (parent, { _id }) => {
      return await Character.findById(_id).populate('ch_stats')
    },
    equipments: async () => {
      return await Equipment.find({}).populate('stats')
    },
    equipment: async(parent, {_id}) => {
      return await Equipment.findById(_id).populate('stats')
    },
    stories: async () => {
      return await Story.find({}).populate('choices').populate({
        path:'choices',
        populate:'next_tale'
      })
    },
    firstStory: async () => {
      return await Story.findOne({first:true}).populate('choices').populate({
        path:'choices',
        populate:'next_tale'
      });
    },
    story: async (parent, {_id}) => {

      return await Story.findById(_id).populate('choices').populate({
        path:'choices',
        populate:'next_tale'
      })
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      //let stories_id = mongoose.Types.ObjectId('64f100e5922340b6835bf619');
      const user = await User.create({...args, stories: '64f100e5922340b6835bf619'});
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if(context.user){
        return await User.findByIdAndUpdate(context.user._id, args, {new: true });
      }
      throw new AuthenticationError('Not logged in')
    },
    addUserCharacter: async (parent, {characters, user_stats}, context) => {
      if(context.user){
        return await User.findByIdAndUpdate(context.user._id, { characters: characters, user_stats: user_stats}, {new: true });
      }
      throw new AuthenticationError('Not logged in')
    },
    updateUserStory: async (parent, {stories}, context) => {
      if(context.user){
        return await User.findByIdAndUpdate(context.user._id, {stories: stories}, {new: true }).populate('equipment').
        populate('characters').populate('user_stats');
      }
      throw new AuthenticationError('Not logged in')
    },
    addCharacter: async (parent, args) => {

      const newcharacter = await Character.create( args );
      return newcharacter;

    },
    removeCharacter: async (parent, args) => {

      const characterData = await Character.findOneAndDelete({
        _id: args
      })

      return characterData;
    },
    updateCharacter: async (parent, {characterId, healthpoints}) => {

      return await Character.findByIdAndUpdate( characterId, {healthpoints:healthpoints}, { new: true });
    },
    addStats: async (parent, args, context) => {

      const newStats = await Stats.create( args );
      return newStats;
      
    },
    removeStats: async (parent, args, context) => {
      if (context.user){
        const statsData = await Stats.findOneAndDelete({
          _id: args
        })

        return statsData;
      }
    },
    updateStats: async (parent, args, context) => {
      if(context.user){
        return await Stats.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    addStory: async (parent, args) => {

      const newStory = await Story.create( args );
      return newStory;

    },
    removeStory: async (parent, args, context) => {

      const storyData = await Story.findOneAndDelete({
        _id: args
      })

      return storyData;
    },
    updateStoryChoices: async (parent, args) => {

        return await Story.findByIdAndUpdate(
          args.storyId,
          {
            $addToSet: {choices: args.choices}, 
          }, 
          { new: true });
    },
    addEquipment: async (parent, args, context) => {

      if(context.user){
        const newEquipment = await Equipment.create( args );
        return newStats;
      }

      throw new AuthenticationError('Not logged in');
    },
    removeEquipment: async (parent, args, context) => {
      if (context.user){
        const equipmentData = await Equipment.findOneAndDelete({
          _id: args
        })

        return statsData;
      }
    },
    updateEquipment: async (parent, args, context) => {
      if(context.user){
        return await Equipment.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    addChoice: async (parent, args) => {

      const newChoice = await Choice.create( args );
      return newChoice;

    },
    removeChoice: async (parent, args) => {
      
      const choiceData = await Choice.findOneAndDelete({_id: args})
      return choiceData;

    },
    updateChoice: async (parent, args,) => {
      
      return await Choice.findByIdAndUpdate(
        args.choiceId, 
        {
          /*option: args.option,
          effect: args.effect,*/
          next_tale: args.next_tale,
        },
        { new: true });

    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers