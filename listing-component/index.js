
const { GraphQLModule } = require('@graphql-modules/core');
const { Binding } = require('graphql-binding');
const Property = require('../property-component');
const Reviews = require('../reviews-component');

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
      const [property, reviews] = await Promise.all([
        propertyBinding.query.property({ id }, `{ geo }`, { context }),
        reviewsBinding.query.reviewsByPropertyId({ propertyId: id }, `{ content }`, { context })
      ]);
      return { id, property, reviews };
    }
  },
  Listing: {
    geo(_) {
      return _.property.geo;
    },
    reviews(_) {
      return _.reviews;
    }
  }
};

module.exports = new GraphQLModule({ typeDefs, resolvers, imports: [Property, Reviews] });