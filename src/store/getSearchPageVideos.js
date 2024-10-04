import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../utils/parseData";


const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "youtube/App/homePageVideos",
  async (isNext, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm},
    } = getState();

    // Construct the API URL
    const url = `https://youtube.googleapis.com/youtube/v3/search?&q=${searchTerm}&key=${API_KEY}&part=snippet&type=video${
      isNext && nextPageTokenFromState ? `&pageToken=${nextPageTokenFromState}` : ""
    }`;

    // Fetch the data
    const response = await axios.get(url);

    const items = response.data.items;
    const nextPageToken = response.data.nextPageToken;

    // Parse the data
    const parsedData = await parseData(items);

    // Return the parsed data and the next page token
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
