"use client"
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import  gsap from 'gsap';
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

const images = [hor1, hor2, hor3, hor4, hor5, hor6, hor7, hor8, hor9];
gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const imageStyle = {
    borderRadius: '10%',
  }
    useEffect(() => {
      window.scrollTo(0, 0);
      const boxes = gsap.utils.toArray('.box');
      boxes.forEach(box => {
        gsap.set(box, { x: -300, opacity: 0.5,  rotation: -1}); // Set initial position
        gsap.to(box, { 
          x: 10,
          rotation: 0,
           opacity: 1,// End position
          scrollTrigger: {
            trigger: box,
            scrub: true,
          }
        });
      });
    }, []);
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[50px] gap-y-[70px] pt-[30px] md:pt-[100px]">
      {images.map((image, index) => (
        <div className="box">
          <Image src={image} width={400} height={400}  style={imageStyle}/>
          </div>
      
      ))}
    </div>
  )
}

export default page;
