const db = require('./connection');
const {} =('./models');

db.once('open', async () => {
    await addInfoHere.deleteMany();

    const addInfo = await addInfoHere.insertmany([

    ])
    console.log('Seed Data Added');
})