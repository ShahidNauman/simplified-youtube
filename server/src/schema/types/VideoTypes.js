const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const VideoType = new GraphQLObjectType({
  name: "Video",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

module.exports = { VideoType };
