import { gql } from "@apollo/client";

const UPLOAD_FILES = gql`
  mutation ($files: [FileUploadType!]!) {
    uploadFiles(files: $files) {
      succeed
      message
      urls
      failed
      error
    }
  }
`;

export { UPLOAD_FILES };
