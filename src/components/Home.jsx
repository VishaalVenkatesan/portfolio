"use client"
import Typewriter from 'typewriter-effect';
import turtle from '../assets/turtle.png';
import waves from '../assets/waves.jpeg';
import Image from 'next/image';

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
            className="opacity-15 accent-slate-100"
          />
        </div>
        <div className='md:w-[1100px] md:pt-[200px] relative'>
          <div className="absolute inset-0 sm:hidden">
            <Image  
              src={waves} 
              alt="waves" 
              layout="fill" 
              objectFit="cover" 
              className="opacity-15 accent-slate-100"
            />
          </div>
          <div className="text-6xl font-normal font-serif pt-10 sm:pt-[1px] pl-[15px]">
        <Typewriter 
         onInit={(typewriter) => { 
           typewriter.typeString("Vishaal is a Software Developer based in Bengaluru. He is fueled by simplicity, ikea plants, and the world. Studying CS in MUJ.") 
             .pauseFor(500) 
              .deleteAll() 
              .start(); 
         }} 
         options={{
           loop: true,
         }} 
        />
      </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

