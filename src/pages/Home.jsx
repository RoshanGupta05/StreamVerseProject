import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppDispatch, useAppSelector } from '../hooks/useApp'
import { getHomePageVideos } from '../store/Reducer/getHomePageVideos'
import Spinner from '../components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../components/Card'

const Home = () => {

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state)=>state.youtubeApp.videos)
  console.log(videos)
  
  useEffect(()=>{
        dispatch(getHomePageVideos(false))
  },[dispatch])

  return (
    <div>
      <div style={{height:"7.5vh;"}}>
        <Navbar />
      </div>
      <div className='flex' style={{height:"92.5vh"}}>
        <Sidebar />
        {
          videos.length ?(
            <InfiniteScroll dataLength={videos.length}
              next={()=> dispatch(getHomePageVideos(true))}
              hasMore={videos.length<500}
              Loader = {<Spinner/>}
              height={659}
              className='p-4 w-100'
            >
              <div className='grid gap-y-4 gap-x-4 grid-cols-4'>
              {
                videos.map((item) =>{
                return <Card data={item} key={item.videoId}/>
                })
              }
              </div>
            </InfiniteScroll>
          ):(
            <Spinner/>
          )
        }
      
      </div>
    </div>
  )
}

export default Home
