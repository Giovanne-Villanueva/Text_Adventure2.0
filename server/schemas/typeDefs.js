const { gql } = require('apollo-server-express');


const typeDefs = gql`
type PaymentResult {
    success: Boolean!
    paymentIntentID: String
    error: String
}

type Mutation {
    processPayment(amount: Int!): PaymentResult!
}
`;

module.exports = typeDefs;