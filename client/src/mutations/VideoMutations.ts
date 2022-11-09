import { gql } from "@apollo/client";

const ADD_VIDEO = gql`
  mutation AddVideo($name: String!, $thumbnailUrl: String!, $url: String!) {
    addVideo(name: $name, thumbnailUrl: $thumbnailUrl, url: $url) {
      id
      name
      thumbnailUrl
      url
    }
  }
`;

export { ADD_VIDEO };
