const db = require('./connection');
const {User, Choice, Equipment, index, Stats, Story } =('./models');

db.once('open', async () => {
    await addData.deleteMany();

    const addData = await addInfoHere.insertmany([

    ])
    console.log('Seed Data Added');
})