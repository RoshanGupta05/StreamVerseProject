  import React from 'react';
  import { GiHamburgerMenu } from 'react-icons/gi';
  import { SiStreamlabs } from 'react-icons/si';
  import { IoIosSearch } from 'react-icons/io';
  import { FaMicrophone } from 'react-icons/fa';
  import { RiVideoAddLine } from 'react-icons/ri';
  import { BsBell } from 'react-icons/bs';
  import { useLocation, useNavigate, Link } from 'react-router-dom'; // Imported Link
  import { useAppDispatch, useAppSelector } from '../hooks/useApp';
  import { changeSearchTerm, clearVideos } from '../features/youtube/youtubeSlice';
  import { getSearchPageVideos } from '../store/getSearchPageVideos';

  const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

    const handleSearch = () => {
      if (location.pathname !== '/search') {
        navigate("/search");
      } else {
        dispatch(clearVideos());
        dispatch(getSearchPageVideos(false));
      }
    };

    return (
      <div className='flex justify-between px-14 h-14 items-center bg-[#212121] opacity-95 sticky text-white'>
        <div className='flex gap-8 items-center text-2xl '>
          <div>
            <GiHamburgerMenu />
          </div>
          <Link to="/" className='flex gap-2 items-center justify-center'>
            <SiStreamlabs className='text-2xl text-blue-600'/>
            <span className='text-xl font-bold'>StreamVerse</span>
          </Link>
        </div>
        <div className='flex items-center justify-center gap-5'>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}>
            <div className='flex items-center bg-zinc-800 h-10 px-10 pr-2 rounded-3xl'>
              <div className='flex items-center gap-5 pr-5'>
                <input 
                  type="text" 
                  placeholder='Search' 
                  className='w-96 bg-zinc-800 focus:outline-none border-none' 
                  value={searchTerm}
                  onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
                />
              </div>
              <button className='h-10 w-16 flex items-center justify-center bg-zinc-700 rounded-r-3xl'>
                <IoIosSearch className='text-xl' />
              </button>
            </div>
          </form>
          <div className='text-xl bg-zinc-800 rounded-full'>
            <FaMicrophone />
          </div>
        </div>
        <div className='flex items-center gap-5 text-xl'>
          <RiVideoAddLine />
          <div className='relative'>
            <BsBell />
            <span className='absolute bottom-2 left-2 text-xs bg-blue-600 rounded-full px-0.5'>9+</span>
          </div>
          <img src="https://tse1.mm.bing.net/th/id/OET.7252da000e8341b2ba1fb61c275c1f30?w=594&h=594&c=7&rs=1&o=5&pid=1.9" alt="profile logo" className='h-8 w-8 rounded-full' />
        </div>   
      </div>
    );
  };

  export default Navbar;
