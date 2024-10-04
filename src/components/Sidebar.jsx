import React from 'react'
import { AiFillHome} from 'react-icons/ai';
import { SiYoutubeshorts } from 'react-icons/si';
import { MdSubscriptions,MdOutlineWatchLater,MdOutlineVideoLibrary } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';
import { FiThumbsUp } from 'react-icons/fi';
const Sidebar = () => {

    const mainLinks = [
        {
            icon:<AiFillHome/>,
            name:'Home'
        },
        {
            icon:<SiYoutubeshorts/>,
            name: 'Reel'
        },
        {
            icon:<MdSubscriptions/>,
            name:'Subscription'
        }
    ]
    const otherLinks = [
        {
            icon:<MdOutlineVideoLibrary/>,
            name:'Library'
        },
        {
            icon:<FaHistory/>,
            name:'History'
        },
        {
            icon:<MdOutlineWatchLater/>,
            name:'Watch Later'
        },
        {
            icon:<FiThumbsUp/>,
            name:'Likes Video'
        }
    ]
  return (
    <div className='w-2/ bg-[#212121] p-2 pr-8 pb-8 h-screen'>
        <ul className='flex flex-col border-b-2 border-gray-700'>
            {mainLinks.map(
                ({icon, name}) =>{
                    return (
                    <li key={name} className={`pl-6 py-3 hover:bg-[#272727] ${name === "Home" ? "bg-[#353434]" : ""} rounded-xl`}>
                        <a href="#" className='flex items-center gap-5'>{icon}
                        <span className='text-sm tracking-wider'  >{name}</span>
                        </a>
                        
                    </li>
                    )
                }
            )}
        </ul>
        <ul className='flex flex-col border-b-1'>
            {otherLinks.map(
                ({icon, name}) =>{
                    return (
                    <li key={name} className={`pl-6 py-3 hover:bg-[#272727] ${name === "Home" ? "bg-[#272727]" : ""}`}>
                        <a href="#" className='flex items-center gap-5'>{icon}
                        <span className='text-sm tracking-wider'    >{name}</span>
                        </a>
                        
                    </li>
                    )
                }
            )}
        </ul>
    </div>
  )
}

export default Sidebar
