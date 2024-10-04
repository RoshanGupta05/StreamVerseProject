import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import convertRawToString from "../../utils/convertRawToString";
import timeSince from "../../utils/timeSince";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getVideoDetails = createAsyncThunk(
  "youtube/App/videoDetails",
  async (id) => {
    const {
      data: { items },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );

    const parsedData = await parseData(items[0]);
    console.log(parsedData);
    
    return parsedData;
    
  }
);

const parseData = async (item) => {
  const channelResponse = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

  const snippet = item.snippet;
  const statistics = item.statistics;
  const id = item.id;
  const channelImage = channelResponse.data.items[0].snippet.thumbnails.default.url;
  const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;

  return {
    videoId: id,
    videoTitle: snippet.title,
    videoDescription: snippet.description,
    videoThumbnail: snippet.thumbnails.medium.url,
    videoViews: convertRawToString(statistics.viewCount),
    videoLikes: convertRawToString(statistics.likeCount), // Fixed: Renamed from videoViews to videoLikes
    videoAge: timeSince(new Date(snippet.publishedAt)),
    channelInfo: {
      id: snippet.channelId,
      image: channelImage,
      name: snippet.channelTitle,
      subscribers: convertRawToString(subscriberCount, true),
    },
  };
};
