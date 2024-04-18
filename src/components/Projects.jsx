"use client"
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import podiumetrics from "../assets/podiumetrics.png"
import portfolio from "../assets/portfolio.png"
import python from "../assets/python.png"
import express from "../assets/express.png"
import Image from "next/image"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Tooltip, Button, Link} from "@nextui-org/react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [gradient, setGradient] = useState(false);

    const titleRef = useRef(null);
    
useEffect(() => {
     gsap.to(titleRef.current, {
    duration: 1.5,
    y: 20,
    opacity: 0.8,
    repeat: -1,
    repeatRefresh: true,
    yoyo: true,
    ease: "power1.inOut",
    
  });
}, []);

  const items = [
    { id: 1, title: 'Podiumterics', 
    info: 'This is a website providing Formula 1 fans with a one-stop destination for legacy F1 statistics. You can find drivers, constructors, results, standings for every year since 1950.',
    stack:"NEXT | TAILWIND | NEXTUI",
    deploy: "https://podiumetrics.vercel.app",
    link:"https://github.com/VishaalVenkatesan/Gym_Website",
    source : podiumetrics,},
    { id: 2, title: 'Social Media Agency Website', 
    info: 'This is a dashboard which contains an about page, services page, and a contact page. It also has a blog page where the admin can add, edit, and delete blog posts.',
    stack:"NEXT | TAILWIND | MONGODB",
    link:"https://github.com/VishaalVenkatesan/express_webite",
    source : express,},
    { id: 3, title: 'C Libraries in Python', 
    info: 'This project provides a way to use C libraries in Python using the CFFI library. It also includes a simple example of using the C standard library in Python.',
    stack:"PYTHON | C",
    link:"https://github.com/VishaalVenkatesan/CFFI_Implementation" ,
    source: python,},
    { id: 4, title: 'Portfolio',
     info: 'Looks like you are already here, take a look at the repo to see how I make it work.',
     stack:"NEXT | TAILWIND | FRAMER | GSAP",
     deploy:"https://vishaalvenkatesan.engineer",
      link:"https://github.com/VishaalVenkatesan/portfolio",
    source: portfolio,},
  ];
  const handleClick = (item) => {
    setSelectedItem(selectedItem !== item ? item : null);
    setGradient(selectedItem !== item); 
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (selectedItem && !event.target.closest('.project-item')) {
      setSelectedItem(null);
    }
  };

  const handleScroll = () => {
    if (selectedItem) {
      setSelectedItem(null);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  window.addEventListener('scroll', handleScroll);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    window.removeEventListener('scroll', handleScroll);
  };
}, [selectedItem]);

      const imageStyle = {
        borderRadius: '30px',
        hover: {
          opacity: 1.0,
        }
      }
      return (
        <section id="projects" className="w-full md:h-screen relative pt-[40px] md:pt-[20px] ">
           <motion.div>
            <h1 ref={titleRef} className="font-serif text-5xl mb-7">my projects</h1>
            </motion.div>
          <div className='bg-primary w-full h-80% p-[50px] rounded-[30px] md:ml-[50px]'>
          <div className='flex items-center justify-center'>
            <div className='md:grid md:grid-cols-2 gap-4 sm:gap-[120px] flex flex-col'>
              {items.map(item => (
               
                <motion.div
                  key={item.id}
                  onClick={() => {
                    handleClick(item)
                  setGradient(false);
                  }}
                  className="relative overflow-hidden transition-all duration-200 cursor-pointer project-item"
                  style={{
                     width: '100%', 
                      height: 'auto',   

                  }}
                >
                  <Image src={item.source} alt={item.title}  style={imageStyle} layout="responsive"/>
                  <h2 className='pt-3 text-2xl text-center font-mutuka'>{item.title}</h2>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
          {selectedItem && (
            <>
          <div
              style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 10, // Make sure the backdrop is below the selected item details
             }}
             onClick={() => setSelectedItem(null)} // Close the selected item details when the backdrop is clicked
    />
            <div className="fixed inset-0 z-20 flex items-center justify-center">
                <motion.div
                    layoutId={selectedItem.id}
                    className={`z-20 text-2xl text-gray-200 bg-secondary rounded-[30px]  p-[20px] m-[40px] ${isMobile ? 'w-[70%]' : 'w-[500px]'}`}
                    onClick={() => setSelectedItem(null)}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    style={{ height: 'auto' }} 
                >
            
                <div className='flex flex-col justify-between h-full pb-4'>
                    <motion.p className='font-mutuka text-[20px]'>{selectedItem.info}</motion.p>
                    <div className='flex justify-center pt-[25px]'>
                      <motion.p className='px-4 py-2 text-xl text-center bg-black rounded-full text-goldtext font-lora'>{selectedItem.stack}</motion.p>
                    </div>
                  </div>
                  <Link href={selectedItem.link} isExternal showAnchorIcon
                    className='mt-[10px] flex text-white font-mutuka text-xl justify-center items-center'>Source Code</Link>
                 {selectedItem.deploy && <Link href={selectedItem.deploy} isExternal showAnchorIcon
                    className='mt-[10px] flex text-white font-mutuka text-xl justify-center items-center'>Deployment</Link>}
              </motion.div>
              </div>
              
            </>
          )}
        </section>
      );
    };
    
    export default Projects;