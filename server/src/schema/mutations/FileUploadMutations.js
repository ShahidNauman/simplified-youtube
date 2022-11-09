const {
  FileUploadType,
  FileUploadResponseType,
} = require("../types/FileUploadTypes");

const uploadFile = {
  type: FileUploadResponseType,
  args: {
    file: { type: FileUploadType },
  },
  resolve(parent, args) {
    return {
      succeed: true,
      message: "The file is successfully uploaded.",
    };
  },
};

module.exports = { uploadFile };
