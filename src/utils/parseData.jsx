import axios from 'axios';
import parseVideoDuration from './parseVideoDuration';
import convertRawToString from './convertRawToString';
import timeSince from './timeSince';


const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const parseData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    const {
      data: { items: channelsData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`
    );

    const parsedChannelsData = channelsData.map((channel) => ({
      id: channel.id,
      image: channel.snippet.thumbnails.default.url,
    }));

    const {
      data: { items: videoData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );

    const parsedData = [];
    items.forEach((item) => {
      const { image: channelImage } = parsedChannelsData.find(
        (data) => data.id === item.snippet.channelId
      );

      if (channelImage) {
        parsedData.push({
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(
            videoData.find((video) => video.id === item.id.videoId)
              .contentDetails.duration
          ),
          videoViews: convertRawToString(
            videoData.find((video) => video.id === item.id.videoId)
              .statistics.viewCount
          ),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channelImage,
            name: item.snippet.channelTitle,
          },
        });
      }
    });

    return parsedData;
  } catch (err) {
    console.log(err);
    return [];
  }
};
