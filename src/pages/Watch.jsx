import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import Navbar from '../components/Navbar';
import { getVideoDetails } from '../store/Reducer/getVideoDetails';
import { getRecommendedVideos } from '../store/Reducer/getRecommendedVideos';
import Spinner from '../components/Spinner';
import SearchCard from '../components/SearchCard';

const Watch = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );
  const recommendedVideo = useAppSelector(
    (state) => state.youtubeApp.recommendedVideo
  );

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
    } else {
      navigate('/');
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [id, currentPlaying, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e1e] text-white">
      <Navbar />

      {currentPlaying ? (
        <div className="flex-grow flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col items-center p-4">
            <div className="bg-[#282828] p-4 rounded-lg shadow-lg w-full max-w-3xl">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                frameBorder="0"
                width="100%"
                height="450px"
                allowFullScreen
                title="Custom Video Player"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="mt-4 w-full max-w-3xl">
              <h1 className="text-3xl font-bold mb-2">{currentPlaying.videoTitle}</h1>
              <p className="text-gray-400 mb-4">{currentPlaying.videoDescription}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{currentPlaying.videoViews} views</span>
                <span>{currentPlaying.videoAge}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 md:pl-6">
            <h2 className="text-2xl font-semibold mb-4">Recommended Videos</h2>
            {recommendedVideo.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedVideo.map((video) => (
                  <SearchCard data={video} key={video.videoId} />
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Watch;
