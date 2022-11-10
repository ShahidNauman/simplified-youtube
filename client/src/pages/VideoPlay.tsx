import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { GET_A_VIDEO } from "../queries/VideoQueries";
import { SERVER_BASE_URL } from "../configurations/AppConfigs";

function VideoPlay() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_A_VIDEO, { variables: { id } });

  if (loading)
    return (
      <div className='d-flex justify-content-center'>
        <Spinner />
      </div>
    );
  if (error) return <p>Something went wrong. Refresh the page.</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <Row>
            <Col xl={6}>
              <video
                src={`${SERVER_BASE_URL}${data.video.url}`}
                className='w-100'
                autoPlay
                controls
                crossOrigin='anonymous'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>{data.video.name}</h3>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default VideoPlay;
