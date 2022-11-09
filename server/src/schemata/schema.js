const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const { videos } = require("../database");

// Video Type
const VideoType = new GraphQLObjectType({
  name: "Video",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const VideoQueries = new GraphQLObjectType({
  name: "VideoQueriesType",
  fields: {
    videos: {
      type: new GraphQLList(VideoType),
      resolve(parent, args) {
        return videos;
      },
    },
    video: {
      type: VideoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return videos.find((video) => video.id === args.id);
      },
    },
  },
});

const VideoMutations = new GraphQLObjectType({
  name: "VideoMutations",
  fields: {
    addVideo: {
      type: VideoType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        thumbnailUrl: { type: GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const videoToAdd = { id: (videos.length + 1).toString(), ...args };
        videos.push(videoToAdd);
        return videoToAdd;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: VideoQueries,
  mutation: VideoMutations,
});
