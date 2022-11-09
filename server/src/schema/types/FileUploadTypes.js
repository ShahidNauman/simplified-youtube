const {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLBoolean,
  GraphQLString,
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
    failed: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

module.exports = { FileUploadType, FileUploadResponseType };
