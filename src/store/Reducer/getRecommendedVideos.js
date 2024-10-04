import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseRecommendedData } from "../../utils/parseRecommendedData";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtube/App/getRecommendedVideos",
  async (videoId, { getState }) => {
    const {
      youtubeApp: {
        currentplaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState();

    // Construct the correct API URL for recommended videos
    const url = `https://youtube.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=20`;

    // Fetch the data
    const response = await axios.get(url);

    const items = response.data.items;
    const nextPageToken = response.data.nextPageToken;

    // Parse the data
    const parsedData = await parseRecommendedData(items, videoId);

    // Return the parsed data and the next page token if you need pagination
    return { parsedData, nextPageToken };
  }
);
