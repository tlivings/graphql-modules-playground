
const { ApolloServer } = require('apollo-server');

const { schema, context} = require('../listing-module');

const server = new ApolloServer({ schema, context });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});