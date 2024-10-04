import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
  return (
    <div className='w-65 h-auto bg-[#121212] text-white rounded-lg shadow-md overflow-hidden'>
      {/* Video Thumbnail */}
      <div className='relative'>
        <span className='absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded'>
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img 
            src={data.videoThumbnail} 
            alt="Thumbnail" 
            className='w-full h-40 object-cover rounded-t-lg'
          />
        </Link>
      </div>

      {/* Video Details */}
      <div className='p-3 flex flex-col gap-2'>
        {/* Channel Info */}
        <div className='flex items-center gap-2'>
          <a href="#">
            <img 
              src={data.channelInfo.image} 
              alt="Channel" 
              className='h-8 w-8 rounded-full border-2 border-gray-600'
            />
          </a>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold line-clamp-2'>
              <Link to={`/watch/${data.videoId}`} className='hover:text-blue-400'>
                {data.videoTitle}
              </Link>
            </h3>
            <div className='text-sm text-gray-400'>
              <a href="#" className='hover:text-blue-400'>
                {data.channelInfo.name}
              </a>
              <div className='flex items-center gap-2'>
                <span>{data.videoViews} views</span>
                <span className='text-gray-600'>•</span>
                <span>{data.videoAge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
