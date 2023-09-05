const db = require('./connection');
const { User, Story, Choice } = require('../models');
import storyData from './story.JSON'

db.once('open', async () => {
  await Story.insertMany();
});