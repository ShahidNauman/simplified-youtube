import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import VideoPlaceholder from "./assets/images/video_placeholder.jpg";
import { VideoType } from "../types/VideoTypes";

function VideosGridItem({ id, name, thumbnailUrl, url }: VideoType) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={(e) => navigate(`/video/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant='top' src={thumbnailUrl || VideoPlaceholder} />
      <Card.Body>
        <Card.Title>{name || "Untitled"}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default VideosGridItem;
