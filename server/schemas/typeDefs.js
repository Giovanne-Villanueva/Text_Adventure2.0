const { gql } = require('apollo-server-express');

const typeDefs = gql`
type checkout {
    session: ID
}
`;

module.exports = typeDefs;