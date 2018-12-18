
const { GraphQLModule } = require('@graphql-modules/core');
const { Binding } = require('graphql-binding');
const Property = require('../property-module');
const Reviews = require('../reviews-module');

const propertyBinding = new Binding({ schema: Property.schema });
const reviewsBinding = new Binding({ schema: Reviews.schema });

const typeDefs = `
    # A listing
    type Listing {
      id: ID!
      geo: [String]
      reviews: [Review]
    }
    type Query {
      # Listing by id
      listing(id: ID!) : Listing
    }
`;

const resolvers = {
  Query: {
    async listing(_, { id }, context, info) {
      const property = propertyBinding.query.property({ id }, `{ geo }`, { context });
      
      return { id, ...property };
    }
  },
  Listing: {
    geo(_) {
      return _.geo;
    },
    reviews(_) {
      return reviewsBinding.query.reviewsByPropertyId({ propertyId: id }, info, { context });
    }
  }
};

module.exports = new GraphQLModule({ typeDefs, resolvers, imports: [Property, Reviews] });