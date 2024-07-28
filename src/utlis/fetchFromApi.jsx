import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "50",
  },
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_RAPID_KEY,
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromApi = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};
