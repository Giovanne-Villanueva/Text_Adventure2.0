const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const typeDefs = require('./schemas/typeDefs')
const resolvers = require ('./schemas/resolvers')

const app = express();

app.use(express.static(path.join(__dirname, 'server')))

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


async function startServer(){
    await server.start();

    server.applyMiddleware({app});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

}

startServer()