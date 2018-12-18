
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
    listing(_, { id }, context, info) {
      return propertyBinding.query.property({ id }, `{ id, geo }`, { context });
    }
  },
  Listing: {
    reviews(_, args, context, info) {
      return reviewsBinding.query.reviewsByPropertyId({ propertyId: _.id }, info, { context });
    }
  }
};

module.exports = new GraphQLModule({ typeDefs, resolvers, imports: [Property, Reviews] });