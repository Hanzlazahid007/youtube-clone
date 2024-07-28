import { CheckCircle } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchFromApi } from "../utlis/fetchFromApi";
import Videos from "./Videos";

const VideoDetail = () => {
  const [videoDetails, setvideoDetails] = useState(null);
  const [videos, setvideos] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchFromApi(
          `videos?part=contentDetails,Csnippet,2Cstatistics&id=${id}`
        );

        setvideoDetails(data.items[0]);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const data = await fetchFromApi(
          `search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxRe`
        );
        console.log("data", data);
        setvideos(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    if (id) {
      fetchVideos();
      fetchRelatedVideos();
    }
  }, [id]);

  if (!videoDetails?.snippet) return "Loading...";
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetails;
  return (
    <Box minHeight={"95vh"}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color={"#fff"} variant="h5">
              {videoDetails?.snippet?.title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color={"#fff"}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Videos Videos={videos || []} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
