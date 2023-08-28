const { AuthenticationError } = require('apollo-server-express');
const { User, Character, Story, Stats, Choice, Equipment} = require('../models');
const { signToken } = require('../utils/auth');
const { populate } = require('../models/User');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if(context.user) {
        const user = await User.findById(context.user.id).populate({
          populate: 'story',
          populate: 'equipment',
          populate: 'character'
        });

        return user;
      }
      
      throw new AuthenticationError('Not logged in');
    },
    characters: async () => {
      return await Character.find({}).populate('stats');
    },
    character: async (parent, { _id }) => {
      return await Character.findById(_id).populate('stats')
    },
    equipments: async () => {
      return await Equipment.find({}).populate('stats')
    },
    equipment: async(parent, {_id}) => {
      return await Equipment.findById(_id).populate('stats')
    },
    story: async (parent, {_id}) => {
      return await Story.findById(_id).populate({
        populate: 'story',
        populate: 'choice'
      })
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if(context.user){
        return await User.findByIdAndUpdate(context.user._id, args, {new: true });
      }
      throw new AuthenticationError('Not logged in')
    },
    addcharacter: async (parent, args, context) => {
      console.log(context)
      if(context.user){
        const newcharacter = await Character.create( args );
        return newcharacter;
      }

      throw new AuthenticationError('Not logged in');
    },
    removeCharacter: async (parent, args, context) => {
      if (context.user){
        const characterData = await Character.findOneAndDelete({
          _id: args
        })

        return characterData;
      }
    },
    updateCharacter: async (parent, args, context) => {
      if(context.user){
        return await Character.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    addStats: async (parent, args, context) => {

      if(context.user){
        const newStats = await Stats.create( args );
        return newStats;
      }

      throw new AuthenticationError('Not logged in');
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
    addStory: async (parent, args, context) => {

      if(context.user){
        const newStory = await Story.create( args );
        return newStory;
      }

      throw new AuthenticationError('Not logged in');
    },
    removeStory: async (parent, args, context) => {
      if (context.user){
        const storyData = await Story.findOneAndDelete({
          _id: args
        })

        return storyData;
      }
    },
    updateStory: async (parent, args, context) => {
      if(context.user){
        return await Story.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
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
    addChoice: async (parent, args, context) => {

      if(context.user){
        const newChoice = await Choice.create( args );
        return newChoice;
      }

      throw new AuthenticationError('Not logged in');
    },
    removeChoice: async (parent, args, context) => {
      if (context.user){
        const choiceData = await Choice.findOneAndDelete({
          _id: args
        })

        return choiceData;
      }
    },
    updateChoice: async (parent, args, context) => {
      if(context.user){
        return await Choice.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
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