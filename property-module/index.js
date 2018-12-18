
const { GraphQLModule } = require('@graphql-modules/core');

const typeDefs = `
    # A listing
    type Property {
      id: ID!
      geo: [String]
    }
    type Query {
      # Property by id
      property(id: ID!) : Property
    }
`;

const resolvers = {
  Query: {
    property(_, { id }) {
      return { id: id, geo: ['41.40338', '2.17403'] };
    }
  }
};

module.exports = new GraphQLModule({ typeDefs, resolvers });