import { gql } from "@apollo/client";

const GET_VIDEOS = gql`
  query getVideos {
    videos {
      id
      name
      thumbnailUrl
      url
    }
  }
`;

const GET_A_VIDEO = gql`
  query getAVideo($id: ID!) {
    video(id: $id) {
      name
      url
    }
  }
`;

export { GET_VIDEOS, GET_A_VIDEO };
