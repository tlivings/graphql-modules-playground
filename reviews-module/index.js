
const { GraphQLModule } = require('@graphql-modules/core');

const typeDefs = `
    # A review
    type Review {
      id: ID!
      propertyId: ID!
      content: String!
    }

    type Query {
      # Reviews by property id
      reviewsByPropertyId(propertyId: ID!) : [Review]
    }
`;

const resolvers = {
  Query: {
    reviewsByPropertyId(_, { propertyId }) {
      return [{ id: 1, propertyId, content: 'id 1 content' }, { id: 2, propertyId, content: 'id 2 content' }];
    }
  }
};

module.exports = new GraphQLModule({ typeDefs, resolvers });