import React from 'react';
import { useEffect,useState } from 'react';
import './Carousel.css';
import Alumni from './assets/Alumni.png'

const Carousel = () => {
    const data = ["1","2","3","4"]
    const [currentIndex,setCurrentIndex] = useState(0)
    const carouselInfiniteScroll = ()=>{
        if(currentIndex === data.length-1){
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex+1);
    }
    useEffect(()=>{
        const interval = setInterval(()=>{carouselInfiniteScroll()},3000)
        return ()=> clearInterval(interval)
    })
  return (
    <div className='carousel-container'>
      {data.map((item,index)=>{
        return <div className='carousel-Item' style={{transform: `translate(-${currentIndex*100}%)`}} key={index}>
            <div className="Alumnicard">
                <img src={Alumni} style={{width:"15vw"}} alt="" />
                <h2>Alumni</h2>
                <h3>XYZ Company</h3>
            </div>
            </div>
      })}
    </div>
  )
}

export default Carousel
