"use client"
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import vishaal from '../assets/vishaal.jpeg';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
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

  //gsap animation
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

  return (
    <section id="about" className="w-full md:h-screen pt-[40px] md:pt-[2px]">
      <div className="flex flex-col items-center h-full md:flex-row md:justify-between">
        <div className="flex flex-col w-full px-2 md:w-1/2">
          <motion.div animate={controlsText}>
            <motion.div animate={controlsText}>
            <h1 ref={titleRef} className="font-serif text-5xl mb-7">little bit about me</h1>
            </motion.div>
            <div className='text-balance'>
              <p className="mb-4 text-2xl font-normal text-gray-700 font-re p-[3px] leading-8">
                Hi! I'm Vishaal Venkatesan, a 3rd-year student at Manipal University Jaipur, pursuing my
                Bachelor of Technology in Computer Science. With a steadfast commitment to personal and professional growth,
                 I continuously seek out avenues to expand my 
                skill set and remain abreast of emerging trends and advancements within the industry. 
                I have a keen interest in creating aesthetically pleasing front-end web designs  with a responsive back-end. I am an enthusiastic learner, always curious
                about how every technology I utilize in my work operates underneath.
                </p>
                 <p className='mb-4 text-2xl font-normal text-gray-700 font-lora p-[3px] leading-8'>
                 Outside of my academic pursuits, I've cultivated various interests and hobbies. I've practiced karate and have a deep appreciation for Carnatic music
                 . Additionally, I'm an avid trekker, hitting the gym regularly to maintain a healthy lifestyle. Motorsports have been a passion of mine since childhood,
                  and I continue to enjoy them to this day.
                  Moreover, I've honed my skills in photography, capturing moments that inspire me. 
                 If you're interested, you can check out some of my work {" "} 
                <Link href="/gallery" className="text-2xl text-blue-900">
                  <u>here</u>.
                </Link>{" "}
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
            className="rounded-[30px] justify-between md:ml-[100px] "
          />
        </motion.div>
        </div>
    </section>
  );
};

export default About;