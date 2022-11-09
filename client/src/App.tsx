import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import VideosGrid from "./pages/VideosGrid";
import VideoUpload from "./pages/VideoUpload";
import VideoPlay from "./pages/VideoPlay";

const appoloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={appoloClient}>
      <BrowserRouter>
        <Header />
        <Container fluid className='pt-4 pb-4'>
          <Routes>
            <Route path='/' element={<VideosGrid />} />
            <Route path='/upload' element={<VideoUpload />} />
            <Route path='/video/:id' element={<VideoPlay />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
