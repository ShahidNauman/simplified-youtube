const { GraphQLID, GraphQLList } = require("graphql");
const { VideoType } = require("../types/VideoTypes");

const getAllVideos = {
  type: new GraphQLList(VideoType),
  resolve(parent, args) {
    return global.videos;
  },
};

const getVideoById = {
  type: VideoType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return global.videos.find((video) => video.id === args.id);
  },
};

module.exports = { getAllVideos, getVideoById };
