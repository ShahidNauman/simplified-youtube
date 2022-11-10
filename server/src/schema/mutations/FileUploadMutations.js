const path = require("path");
const fs = require("fs");
const {
  FileUploadType,
  FileUploadResponseType,
} = require("../types/FileUploadTypes");
const { GraphQLList } = require("graphql");

const addTimeStamp = (filename) => {
  const { name, ext } = path.parse(filename);
  return name.replace(/[\s-]+/gi, "_") + Date.now() + ext;
};

const uploadFiles = {
  type: FileUploadResponseType,
  args: {
    files: { type: new GraphQLList(FileUploadType) },
  },
  async resolve(parent, args) {
    const uploadedFileUrls = await Promise.all(
      args.files.map(async (file) => {
        const { filename, mimetype, createReadStream } = await file.promise;
        const readStream = createReadStream();
        const uniqueName = addTimeStamp(filename);
        const filePathToUpload = path.join(
          __dirname,
          `../../../uploads/${uniqueName}`
        );
        await readStream.pipe(fs.createWriteStream(filePathToUpload));

        return `/uploads/${uniqueName}`;
      })
    );

    return {
      succeed: true,
      message: "The files are successfully uploaded.",
      urls: uploadedFileUrls,
    };
  },
};

module.exports = { uploadFiles };
