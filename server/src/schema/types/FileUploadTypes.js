const {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const FileUploadType = new GraphQLScalarType({
  name: "FileUploadType",
  serialize: (file) => file,
  parseValue: (file) => file,
  parseLiteral(file) {
    return file;
  },
});

const FileUploadResponseType = new GraphQLObjectType({
  name: "FileUploadResponseType",
  fields: () => ({
    succeed: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    urls: { type: new GraphQLList(GraphQLString) },
    failed: { type: GraphQLBoolean },
    error: { type: GraphQLString },
  }),
});

module.exports = { FileUploadType, FileUploadResponseType };
