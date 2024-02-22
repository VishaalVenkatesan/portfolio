"use client"
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import vishaal from '../assets/vishaal.jpeg';
import { useEffect } from 'react';

const About = () => {
  const controlsImage = useAnimation();
  const controlsText = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportWidth = window.innerWidth;
      
      if (viewportWidth > 768) {
        if (scrollY > 0) {
          controlsImage.start({ x: 0, opacity: 1, transition: { duration: 1 } });
          controlsText.start({ x: 0, opacity: 1, transition: { duration: 1 } });
        } else {
          controlsImage.start({ x: '100vw', opacity: 0, transition: { duration: 2 } });
          controlsText.start({ x: '-100vw', opacity: 0, transition: { duration: 1 } });
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlsImage, controlsText]);

  return (
    <section id="about" className="w-full md:h-screen pt-[40px] sm:pt-[2px]">
      <div className="flex flex-col items-center justify-between h-full sm:flex-row ">
        <div className="flex flex-col w-full px-2 md:w-1/2">
          <motion.div animate={controlsText}>
            <h1 className="font-serif text-5xl mb-7">little bit about me</h1>
            <div className='text-balance'>
              <p className="mb-4 text-2xl font-normal text-gray-700 font-lora p-[3px] leading-8">
                Hi! I'm Vishaal Venkatesan, a 3rd-year student at Manipal University Jaipur, pursuing my
                Bachelor of Technology in Computer Science. Stemming from my passion for photography, 
                I have a keen interest in creating aesthetically pleasing front-end web designs using
                React (Next.js) with a responsive back-end. I am an enthusiastic learner, always curious
                about how every technology I utilize in my work operates underneath. <br /> Apart from 
                development, I also consider myself a great photographer, and you can check out some of
                my work{" "}
                <Link href="/gallery" className="text-blue-900">
                  here.
                </Link>{" "}
                Since I was a kid, I have really enjoyed motorsport of any kind and continue to do so
                to this day.
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div animate={controlsImage} className="w-full md:w-1/2">
          <Image
            src={vishaal}
            alt="myPhoto"
            width={400}
            height={300}
            className="rounded-[30px] md:ml-[200px] sm:ml-[50px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;