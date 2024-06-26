"use client"
import {useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import github from "../assets/github.png"
import linkedin from "../assets/linkedin.png" 
import insta from "../assets/insta.png"
import mail from "../assets/mail.png"
import { Link } from '@nextui-org/react';
import Image from "next/image"


const Contact = () => {
  const controls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0)  {
        controls.start({ x: 0, opacity: 1, transition: { duration: 1 } });
      }else{
        controls.start({ x: '-100vw', opacity: 0, transition: { duration: 1 } });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <section id="contact" className="w-full md:h-screen pt-[100px] md:pt-[200px]">
      <motion.section animate={controls}>
        <div className='xl:mt-[200px]'>
          <div className="flex flex-col gap-8 md:flex-row md:ml-[40px]">
            <div className='w-full md:w-3/4'>
              <div className='w-full h-full lg:p-8 p-4 bg-primary rounded-[30px]'>
                <div className='font-serif text-4xl mb-7'>thanks for snapping a look. Let's get in touch!</div>
                <form action="https://getform.io/f/negAA9bw" method="POST" className="flex flex-col gap-8 sm:grid-cols-2 sm:grid p-7 ">
                  <style jsx>{`
                    ::placeholder {
                      color: gray;
                      opacity: 1;
                      font-size: 1.0em;
                    }
                  `}</style>
                  <input type="text" placeholder="First Name" name="firstname" className="w-auto p-3 border-4 border-gray-800 rounded-[20px] bg-background focus:outline-none" />
                  <input type="text" placeholder="Last Name" name="lastname" className="w-auto p-3 border-4 border-gray-800 rounded-[20px] bg-background focus:outline-none" />
                  <input type="text" placeholder="Subject" name="subject" className="w-auto p-3 border-4 border-gray-800 rounded-[20px] bg-background focus:outline-none" />
                  <input type="email" placeholder="Email" name="email" className="w-auto p-3 border-4 border-gray-800 rounded-[20px] bg-background focus:outline-none" />
                  <textarea placeholder="Message" name="message" className="w-auto col-span-2 p-3 border-4 border-gray-800 rounded-[20px] bg-background focus:outline-none" />
                  <button className="w-auto col-span-2 p-3 text-goldtext font-bold bg-secondary rounded-[20px]">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full mt-6 md:w-1/4 md:mt-0">
              <div className='w-full h-full p-8 bg-secondary rounded-[30px] flex flex-col justify-between pl-[30px]'>
                <div>
                  <div className="flex flex-col gap-y-[20px] text-goldtext">
                    <h1 className='text-3xl font-semibold font-lora text-pretty'>Vishaal Venkatesan.</h1>
                    <h1 className='text-2xl font-semibold font-lora text-pretty'>Developer | Student</h1>
                    <h1 className='justify-center text-xl font-lora text-pretty'>Contact me to work together on a freelance project. <br></br> I am also available for 
                      full-time positions.
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row justify-center pt-[40px] space-x-4">
                  <Link isExternal href="https://www.linkedin.com/in/vishaalvenkatesan/">
                     <Image src={linkedin} alt="linkedin"  width={50} height={50} />
                  </Link>
                  <Link isExternal href="mailto:vishaalvo3@gmail.com?cc=vishaal.219301277@muj.manipal.edu">
                      <Image src={mail} alt="mail" width={50} height={50}/>
                  </Link>
                  <Link isExternal href="https://github.com/VishaalVenkatesan">
                      <Image src={github} alt="github"  width={50} height={50}/>
                  </Link>
                  <Link isExternal href="https://www.instagram.com/vishaal_venkatesan?igsh=MWo4bXdmb2U5cmUxaw%3D%3D&utm_source=qr">
                      <Image src={insta} alt="instagram"  width={50} height={50}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  )
}

export default Contact;
