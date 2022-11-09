import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_VIDEO } from "../mutations/VideoMutations";
import { GET_VIDEOS } from "../queries/VideoQueries";
import { VideoType } from "../types/VideoTypes";

function VideoUpload() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [name, setName] = useState("");

  const [addVideo] = useMutation(ADD_VIDEO, {
    variables: { name, thumbnailUrl, url },
    update(cache, { data: { addVideo } }) {
      const { videos } = cache.readQuery({ query: GET_VIDEOS }) as {
        videos: VideoType[];
      };
      cache.writeQuery({
        query: GET_VIDEOS,
        data: { videos: [...videos, addVideo] },
      });
    },
  }) as any;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (name === "" || thumbnailUrl === "" || url === "") {
      return alert("Please fill in all the fields");
    }

    addVideo(name, thumbnailUrl, url);

    setName("");
    setThumbnailUrl("");
    setUrl("");

    navigate("/");
  };

  return (
    <>
      <h2 className='mb-4'>Upload New Video</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='url'>Browse video files to upload:</Form.Label>
          <Form.Control
            type='file'
            accept='video/mp4'
            id='url'
            aria-describedby='urlHelpBlock'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Form.Text id='urlHelpBlock' muted>
            The video must be of MP4 format only.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='thumbnailUrl'>Upload a thumbnail:</Form.Label>
          <Form.Control
            type='file'
            accept='image/jpg'
            id='thumbnailUrl'
            aria-describedby='thumbnailUrlHelpBlock'
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
          <Form.Text id='thumbnailUrlHelpBlock' muted>
            Upload a picture that shows what's in your video.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='name'>Title:</Form.Label>
          <Form.Control
            type='text'
            id='name'
            aria-describedby='nameHelpBlock'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text id='nameHelpBlock' muted>
            The title must contain letters and numbers.
          </Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default VideoUpload;
