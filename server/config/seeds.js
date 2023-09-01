const db = require('./connection');
const {User, Choice, Equipment, Index, Stats, Story } = ('./models');

db.once('open', async () => {
    await addData.deleteMany();

    const addData = await addInfoHere.insertmany([

    ])
    console.log('Seed Data Added');
})

// or is it insertMany ?
const users = await User.insertOne()

const choices = await Choices.insertMany([

])

const indices = Index.insertMany([]

)

const stats = Stats.insertMany([])

const stories = Story.insertMany([])