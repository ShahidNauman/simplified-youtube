const { GraphQLString, GraphQLNonNull } = require("graphql");
const { VideoType } = require("../types/VideoTypes");

const addVideo = {
  type: VideoType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    thumbnailUrl: { type: GraphQLNonNull(GraphQLString) },
    url: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    const videoToAdd = { id: (global.videos.length + 1).toString(), ...args };
    global.videos.push(videoToAdd);
    return videoToAdd;
  },
};

module.exports = { addVideo };
