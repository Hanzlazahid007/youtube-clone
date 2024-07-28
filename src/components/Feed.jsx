import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import Videos from "./Videos";
import { fetchFromApi } from "../utlis/fetchFromApi";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchFromApi(
          `search?part=snippet&q=${selectedCategory}`
        );
        setVideos(data.items); // Ensure `data.items` is correct based on the API response
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
    console.log(videos);
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          sx={{ mt: 1.5, color: "#fff" }}
          variant="body2"
          className="copyright"
        >
          Copyright 2022 JSM Media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflow: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        <Videos Videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
