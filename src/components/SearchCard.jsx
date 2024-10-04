import React from 'react';
import { Link } from 'react-router-dom';

const SearchCard = ({ data }) => {
  return (
    <div className='flex gap-3 p-4'>
      {/* Video Thumbnail */}
      <div className='relative min-w-[168px] max-w-[360px]'>
        <Link to={`/watch/${data.videoId}`}>
          <img src={data.videoThumbnail} alt="thumbnail" className='h-full w-full object-cover rounded-lg' />
        </Link>
        <span className='absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded'>
          {data.videoDuration}
        </span>
      </div>

      {/* Video Details */}
      <div className='flex flex-col gap-2 w-full'>
        {/* Video Title */}
        <h3 className='text-lg font-medium'>
          <Link to={`/watch/${data.videoId}`} className='text-white hover:text-gray-300 line-clamp-2'>
            {data.videoTitle}
          </Link>
        </h3>

        {/* Channel Info */}
        <div className='flex items-center gap-3'>
          <img src={data.channelInfo.image} alt="channel" className='h-9 w-9 rounded-full' />
          <span className='text-sm text-gray-400'>{data.channelInfo.name}</span>
        </div>

        {/* Video Stats */}
        <div className='text-sm text-gray-400'>
          <span>{data.videoViews} views</span>
          <span className='mx-2'>•</span>
          <span>{data.videoAge}</span>
        </div>

        {/* Video Description */}
        <p className='text-sm text-gray-400 line-clamp-2'>
          {data.videoDescription}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
