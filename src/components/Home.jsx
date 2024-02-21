"use client"
import Typewriter from 'typewriter-effect';
import turtle from '../assets/turtle.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Home = () => {

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div className="flex flex-row h-full">
        <div className='hidden sm:block'>
          <Image  
            src={turtle} 
            alt="turtle" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-15 accent-slate-100] "
          />
          </div>
        <div className='md:w-[1100px] md:pt-[200px]'>
          <Typewriter 
            onInit={(typewriter) => { 
              typewriter.typeString("Vishaal is a Software Developer based in Bengaluru. He is fueled by simplicity, ikea plants, and the world. Studying CS in MUJ.") 
                .pauseFor(500) 
                .deleteAll() 
                .start(); 
            }} 
            options={{
              wrapperClassName: "text-4xl sm:text-7xl font-normal font-serif",
              loop: true,
            }} 
          />
        </div>
      </div>
    </section>
  );
}

export default Home;

