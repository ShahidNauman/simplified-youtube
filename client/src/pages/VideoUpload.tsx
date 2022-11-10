import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILES } from "../mutations/FileUploadMutations";
import { ADD_A_VIDEO } from "../mutations/VideoMutations";
import { GET_VIDEOS } from "../queries/VideoQueries";
import { VideoType } from "../types/VideoTypes";

function VideoUpload() {
  const navigate = useNavigate();

  const videoRef = useRef<HTMLInputElement>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const [videoToUpload, setVideoToUpload] = useState<File | null>();
  const [thumbnailToUpload, setThumbnailToUpload] = useState<File | null>();
  const [name, setName] = useState<string>("");

  const [uploadFiles] = useMutation(UPLOAD_FILES, {
    onError(error, clientOptions?) {
      console.error(error);
    },
    onCompleted(data, clientOptions?) {
      console.log(data);
    },
  });

  const [addVideo] = useMutation(ADD_A_VIDEO, {
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

  const onVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.item(0);
    setVideoToUpload(selectedFile);
  };

  const onThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.item(0);
    setThumbnailToUpload(selectedFile);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!videoToUpload || !thumbnailToUpload || !name) {
      return alert("Please fill in all the fields");
    }

    if (
      videoRef.current?.validity.valid &&
      thumbnailRef.current?.validity.valid
    ) {
      const {
        data: {
          uploadFiles: {
            urls: [url, thumbnailUrl],
          },
        },
      } = await uploadFiles({
        variables: { files: [videoToUpload, thumbnailToUpload] },
      });

      addVideo({ variables: { name, thumbnailUrl, url } });
    }

    setVideoToUpload(undefined);
    setThumbnailToUpload(undefined);
    setName("");

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
            ref={videoRef}
            id='url'
            aria-describedby='urlHelpBlock'
            onChange={onVideoSelect}
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
            ref={thumbnailRef}
            id='thumbnailUrl'
            aria-describedby='thumbnailUrlHelpBlock'
            onChange={onThumbnailSelect}
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
            onChange={(e) => setName(e.target?.value)}
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
