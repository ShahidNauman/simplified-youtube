const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { getAllVideos, getVideoById } = require("./queries/VideoQueries");
const { addVideo } = require("./mutations/VideoMutations");
const { uploadFile } = require("./mutations/FileUploadMutations");

global.videos = [
  {
    id: "1",
    name: "Sample Video 720p",
    thumbnailUrl: "/uploads/video720p.jpg",
    url: "/uploads/video720p.mp4",
  },
  {
    id: "2",
    name: "Sample Video 240p",
    thumbnailUrl: "/uploads/video360p.jpg",
    url: "/uploads/video360p.mp4",
  },
];

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
    uploadFile,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
