const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const { videos } = require("../database");

// Video Type
const VideoType = new GraphQLObjectType({
  name: "Video",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    videos: {
      type: new GraphQLList(VideoType),
      resolve(parent, args) {
        return videos;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
