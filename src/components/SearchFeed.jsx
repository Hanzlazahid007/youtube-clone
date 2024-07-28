import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import { useEffect } from "react";
import Videos from "./Videos";
import { fetchFromApi } from "../utlis/fetchFromApi";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchFromApi(`search?part=snippet&q=${searchTerm}`);
        setVideos(data.items); // Ensure `data.items` is correct based on the API response
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflow: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        mb={2}
        sx={{ color: "white" }}
      >
        Search Results For :{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span> videos
      </Typography>
      <Videos Videos={videos} />
    </Box>
  );
};

export default SearchFeed;
