import axios from 'axios';
import parseVideoDuration from './parseVideoDuration';
import convertRawToString from './convertRawToString';
import timeSince from './timeSince';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const parseRecommendedData = async (items) => {
  try {
    const videoIds = items.map(item => item.id.videoId);
    const channelIds = items.map(item => item.snippet.channelId);

    // Fetch channel data
    const { data: { items: channelsData } } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`
    );

    const parsedChannelsData = channelsData.reduce((acc, channel) => {
      acc[channel.id] = {
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      };
      return acc;
    }, {});

    // Fetch video data
    const { data: { items: videoData } } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );

    const videoDataMap = videoData.reduce((acc, video) => {
      acc[video.id] = {
        duration: parseVideoDuration(video.contentDetails.duration),
        views: convertRawToString(video.statistics.viewCount),
      };
      return acc;
    }, {});

    // Parse the items
    const parsedData = items.map(item => {
      const channelData = parsedChannelsData[item.snippet.channelId];
      const videoInfo = videoDataMap[item.id.videoId];

      return {
        videoId: item.id.videoId,
        videoTitle: item.snippet.title,
        videoDescription: item.snippet.description,
        videoThumbnail: item.snippet.thumbnails.medium.url,
        videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        videoDuration: videoInfo?.duration || "N/A",
        videoViews: videoInfo?.views || "N/A",
        videoAge: timeSince(new Date(item.snippet.publishedAt)),
        channelInfo: {
          id: item.snippet.channelId,
          image: channelData?.image || "default_channel_image_url", // Fallback to a default image if missing
          name: item.snippet.channelTitle,
        },
      };
    });

    return parsedData;
  } catch (err) {
    console.error("Error parsing recommended data:", err);
    return [];
  }
};
