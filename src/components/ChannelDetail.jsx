import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utlis/fetchFromApi";
import { Box } from "@mui/material";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";
// import { ChannelCard } from "./ChannelCard";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchchannel = async () => {
      try {
        const data = await fetchFromApi(`channels?part=snippet&id=${id}`);
        setChannel(data?.items[0]); // Ensure `data.items` is correct based on the API response
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    const fetchVideos = async () => {
      try {
        const data = await fetchFromApi(
          `search?channelId=${id}&part=snippet&order=date`
        );
        setVideos(data?.items); // Ensure `data.items` is correct based on the API response
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchchannel();
    fetchVideos();
    console.log(channel);
    console.log(videos);
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{ background: "red", zIndex: 10, height: "300px" }} />
        <ChannelCard marginTop={"-110px"} channelDetail={channel} />
      </Box>
      <Box display={"flex"} p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos Videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
