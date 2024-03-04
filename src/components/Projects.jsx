"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gym from "../assets/gym.png"
import portfolio from "../assets/portfolio.png"
import python from "../assets/python.png"
import express from "../assets/express.png"
import Image from "next/image"

const Projects = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);


  const items = [
    { id: 1, title: 'Gym Website', 
    info: 'This is a gym website that provides information about the gym and its services. It also has a contact form for users to get in touch with the gym.',
    stack:"HTML CSS JavaScript SQL",
    link:"https://github.com/VishaalVenkatesan/Gym_Website",
    source : gym,},
    { id: 2, title: 'Social Media Agency Website', 
    info: 'This is a dashboard which contains an about page, services page, and a contact page. It also has a blog page where the admin can add, edit, and delete blog posts.',
    stack:"NextJs TailwindCSS MongoDb",
    link:"https://github.com/VishaalVenkatesan/express_webite",
    source : express,},
    { id: 3, title: 'C Libraries in Python', 
    info: 'This project provides a way to use C libraries in Python using the CFFI library. It also includes a simple example of using the C standard library in Python.',
    stack:"Python C",
    link:"https://github.com/VishaalVenkatesan/CFFI_Implementation" ,
    source: python,},
    { id: 4, title: 'This Portfolio',
     info: 'Looks like you are already here :), take a peak at how I make it work.',
     stack:"NextJS TailwindCSS FramerMotion",
      link:"https://github.com/VishaalVenkatesan/portfolio",
    source: portfolio,},
  ];

  const handleClick = (item) => {
    setSelectedItem(selectedItem !== item ? item : null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1060);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
      }, []);
      const imageStyle = {
        border: '2px solid black',
      }
      return (
        <section id="projects" className="w-full md:h-screen relative pt-[40px] md:pt-[2px]">
          <h1 className='mb-10 font-serif text-5xl'>projects i made</h1>
          <div className='flex items-center justify-center'>
            <div className='md:grid md:grid-cols-2 gap-4 sm:gap-[130px] flex flex-col'>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className="relative overflow-hidden transition-all duration-200 cursor-pointer"
                  style={{ width: isMobile ? 370 : 400, height: isMobile ? 250 : 250 }}
                >
                  <Image src={item.source} alt={item.title} layout="fill" objectFit="cover" style={imageStyle}/>
                </motion.div>
              ))}
            </div>
          </div>
          {selectedItem && (
            <>
              <div className="fixed inset-0 z-10 bg-black opacity-70"></div>
              <motion.div
                layoutId={selectedItem.id}
                className={`fixed ${isMobile ? 'top-[10%]  left-[7%] w-[70%]' : 'top-[30%] left-[27%] w-[500px]'} transform -translate-x-1/2 -translate-y-1/2 z-20 text-2xl text-black bg-gray-200 rounded-[30px] 
                cursor-pointer hover:bg-gray-300 p-[20px] m-[40px]`}
                onClick={() => setSelectedItem(null)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                style={{ height: 'auto' }} 
              >
                <div className='flex flex-col justify-between h-full pb-4'>
                  <div className=''>
                    <motion.h2 className='font-serif text-4xl md:text-5xl pb-[10px]' >{selectedItem.title}</motion.h2>
                    <motion.p className='font-popins text-[20px]'>{selectedItem.info}</motion.p>
                    <div className='flex justify-center pt-[25px]'>
                      <motion.p className='px-4 py-2 text-xl text-center text-white bg-black rounded-full font-lora'>{selectedItem.stack}</motion.p>
                    </div>
                  </div>
                  <a href={selectedItem.link} target="_blank" rel="noopener noreferrer"
                    className='mt-[10px] flex text-blue-500 font-serif text-[20px] justify-center items-center'>source code</a>
                </div>
              </motion.div>
            </>
          )}
        </section>
      );
    };
    
    export default Projects;