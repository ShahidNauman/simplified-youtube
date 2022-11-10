const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { getAllVideos, getVideoById } = require("./queries/VideoQueries");
const { addVideo } = require("./mutations/VideoMutations");
const { uploadFiles } = require("./mutations/FileUploadMutations");

global.videos = [];

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    videos: getAllVideos,
    video: getVideoById,
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addVideo,
    uploadFiles,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
