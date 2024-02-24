"use client"
import Image from "next/image"
import hor1 from "../../photos/hor1.jpeg"
import hor2 from "../../photos/hor2.JPG"
import hor3 from "../../photos/hor3.jpeg"
import hor4 from "../../photos/hor4.JPG"
import hor5 from "../../photos/hor5.JPG"
import hor6 from "../../photos/hor6.JPG"
import hor7 from "../../photos/hor7.JPG"
import hor8 from "../../photos/hor8.JPG"
import hor9 from "../../photos/hor9.JPG"
import ver1 from "../../photos/ver1.JPG"
import ver2 from "../../photos/ver2.JPG"
import {motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

const images = [hor1, hor2, hor3, hor4, hor5, hor6, hor7, hor8, hor9, ver1, ver2];

const page = () => {
  const controls = useAnimation();
  const imageStyle = {
    borderRadius: '10%',
    border: '1px solid #fff',
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportWidth = window.innerWidth;
      if(viewportWidth <= 1060){
        if (scrollY > 0) {
          controls.start(index => ({
            x: index % 2 === 0 ? 0 : 0,
            opacity: 1,
            transition: { duration: 2 }
          }));
        } else {
          controls.start(index => ({
            x: index % 2 === 0 ? '100vw' : '-100vw',
            opacity: 0,
            transition: { duration: 2 }
          }));
        
      }
    }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <div className="pl-[0px] md:pl-[30px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[100px] gap-y-[60px] md:pt-[100px] pt-[30px]">
      {images.map((image, index) => (
        <motion.div key={index} className="overflow-hidden" animate={controls} custom={index}>
          <Image src={image} width={400} height={400} objectFit="cover" style={imageStyle}/>
        </motion.div>
      ))}
    </div>
  )
}

export default page;
