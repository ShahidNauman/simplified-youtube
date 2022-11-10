import React from "react";
import { Row, Col } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import VideosGridItem from "../components/VideosGridItem";
import { VideoType } from "../types/VideoTypes";
import { GET_VIDEOS } from "../queries/VideoQueries";
import Spinner from "react-bootstrap/Spinner";
import { SERVER_BASE_URL } from "../configurations/AppConfigs";

function VideosGrid() {
  const { loading, error, data } = useQuery(GET_VIDEOS);

  if (loading)
    return (
      <div className='d-flex justify-content-center'>
        <Spinner />
      </div>
    );
  if (error) return <p>Something went wrong. Refresh the page.</p>;

  return (
    <>
      {!loading && !error && data?.videos && (
        <Row>
          {[...data.videos].reverse().map((aVideo: VideoType) => (
            <Col
              key={`video-item-${aVideo.id}`}
              md={4}
              lg={3}
              xl={2}
              className='mb-4'
            >
              <VideosGridItem
                id={aVideo.id}
                name={aVideo.name}
                thumbnailUrl={`${SERVER_BASE_URL}${aVideo.thumbnailUrl}`}
                url={`${SERVER_BASE_URL}${aVideo.url}`}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default VideosGrid;
