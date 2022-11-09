import { gql } from "@apollo/client";

const ADD_A_VIDEO = gql`
  mutation AddAVideo($name: String!, $thumbnailUrl: String!, $url: String!) {
    addVideo(name: $name, thumbnailUrl: $thumbnailUrl, url: $url) {
      id
      name
      thumbnailUrl
      url
    }
  }
`;

export { ADD_A_VIDEO };
