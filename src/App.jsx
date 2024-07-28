import { Box } from "@mui/material";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchFeed from "./components/SearchFeed";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import VideoDetail from "./components/VideoDetail";
import ChannelDetail from "./components/ChannelDetail";

import "./index.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Box sx={{ background: "#000" }}>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" exact element={<VideoDetail />} />
            <Route path="/channel/:id" exact element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" exact element={<SearchFeed />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
};

export default App;
