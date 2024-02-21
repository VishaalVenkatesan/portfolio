"use client";
import { motion, useScroll } from "framer-motion"
import { useState, useEffect } from "react";
import Link from "next/link";
import menu from "../assets/Menu.png";
import close from "../assets/Close.png";
import Image from "next/image";

const Navbar = () => {
  const {  scrollYProgress  } = useScroll();
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pb-[100px] md:pb-[1px]">
    <motion.div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 10,
      backgroundColor: isScrolled ? "rgba(237, 235, 237, 0.75)" : 'transparent',
      padding: "10px",
      boxShadow: isScrolled ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none',
      transition: 'background-color 1.5s ease, box-shadow 1.5s ease',
    }}
  >
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "6px", 
          backgroundColor: "blue",
          scaleX: scrollYProgress,
          zIndex: 1, 
        }} />
    <div className="flex flex-row items-center justify-between w-full h-full">
      
      <Link href="/#home" scroll={false} className="md:mr-[650px] md:pl-[50px] sm:pl-[5px]">
        <h1 className="font-serif text-4xl font-extrabold ">VV.</h1>
      </Link>

      <div className="justify-between font-carlson ">
        <ul style={{ color: "black" }} className="justify-end hidden md:flex ">
          <Link href="/#home" scroll={false} onClick={() => handleClick("home")}>
            <li className="text-sm uppercase hover:border-b hover:border-black hover:border-solid">Home</li>
          </Link>
          <Link
            href="/#about"
            scroll={false}
            onClick={() => handleClick("about")}
          >
            <li className="ml-10 text-sm uppercase hover:border-b hover:border-black hover:border-solid">About</li>
          </Link>
          <Link href="/gallery" scroll={false}>
            <li className="ml-10 text-sm uppercase hover:border-b hover:border-black hover:border-solid">
              Gallery
            </li>
          </Link>
          <Link
            href="/#projects"
            scroll={false}
            onClick={() => handleClick("projects")}
          >
            <li className="ml-10 text-sm uppercase hover:border-b hover:border-black hover:border-solid">
              Projects
            </li>
          </Link>
          <Link
            href="/#contact"
            scroll={false}
            onClick={() => handleClick("contact")}
          >
            <li className="ml-10 text-sm uppercase hover:border-b hover:border-black hover:border-solid">
              Contact
            </li>
          </Link>
                <Link
                  href="/resume"
                  scroll={false}
                >
                  <li className="ml-10 text-sm uppercase hover:border-b hover:border-black hover:border-solid">
                    Resume
                  </li>
                </Link>
        </ul>
        <div className="z-10 flex items-center flex-1 sm:hidden">
          <Image
            src={toggle ? close : menu}
            alt="menu"
            className="w-[35px] h-[35px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          {toggle && (
            <div className="flex z-10  bg-blue-100 flex-col items-start justify-start p-6 absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-xl shadow-lg">
              <ul className="list-none">
                <Link
                  href="/#home"
                  scroll={false}
                  onClick={() => {
                    handleClick("home");
                    setToggle(false);
                  }}
                >
                  <li className="ml-2 mb-4 text-sm text-[20px] uppercase hover:border-b">
                    Home
                  </li>
                </Link>
                <Link
                  href="/#about"
                  scroll={false}
                  onClick={() => {
                    handleClick("about");
                    setToggle(false);
                  }}
                >
                  <li className="ml-2 mb-4 text-sm text-[20px] uppercase hover:border-b">
                    About
                  </li>
                </Link>
                <Link href="/gallery" scroll={false}>
                  <li className="ml-2 mb-4 text-sm text-[20px] uppercase hover:border-b">
                    Gallery
                  </li>
                </Link>
                <Link
                  href="/#projects"
                  scroll={false}
                  onClick={() => {
                    handleClick("projects");
                    setToggle(false);
                  }}
                >
                  <li className="ml-2 mb-4 text-sm text-[20px] uppercase hover:border-b">
                    Projects
                  </li>
                </Link>
                <Link
                  href="/#contact"
                  scroll={false}
                  onClick={() => {
                    handleClick("contact");
                    setToggle(false);
                  }}
                >
                  <li className="ml-2 mb-4 text-sm text-[20px] uppercase hover:border-b">
                    Contact
                  </li>
                </Link>
                <Link
                  href="/resume"
                  scroll={false}
                >
                  <li className="ml-2 mb-4 text-sm text-[20px] uppercase hover:border-b">
                    Resume
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
    </motion.div>
    </div>
  );
};

export default Navbar;
