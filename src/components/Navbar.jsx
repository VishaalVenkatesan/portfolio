"use client";
import { motion, useScroll } from "framer-motion"
import { useState, useEffect } from "react";
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link";

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
    <div className="pb-[70px] md:pb-[1px]">
    <motion.div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 10,
      backgroundColor: isScrolled ? "#EAD7BB" : 'transparent',
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
          backgroundColor: "#113946",
          scaleX: scrollYProgress,
          zIndex: 1, 
        }} />
    <div className="flex flex-row items-center justify-between w-full h-full">
      <Link href="/#home" scroll={false} className="md:mr-[650px] md:pl-[50px] sm:pl-[5px]">
        <h1 className="font-serif text-4xl font-extrabold ">VV.</h1>
      </Link>

      <div className=" font-mutuka">
        
        <ul style={{ color: "black" }} className="hidden gap-9 lg:flex">
          <Link href="/#home" scroll={false} onClick={() => handleClick("home")}>
            <li className="text-lg uppercase hover:border-b hover:border-black hover:border-solid">Home</li>
          </Link>
          <Link
            href="/#about"
            scroll={false}
            onClick={() => handleClick("about")}
          >
            <li className="text-lg uppercase hover:border-b hover:border-black hover:border-solid">About</li>
          </Link>
          <Link href="/gallery" scroll={false}>
            <li className="text-lg uppercase hover:border-b hover:border-black hover:border-solid">
              Gallery
            </li>
          </Link>
          <Link
            href="/#projects"
            scroll={false}
            onClick={() => handleClick("projects")}
          >
            <li className="text-lg uppercase hover:border-b hover:border-black hover:border-solid">
              Projects
            </li>
          </Link>
          <Link
            href="/#contact"
            scroll={false}
            onClick={() => handleClick("contact")}
          >
            <li className="text-lg uppercase hover:border-b hover:border-black hover:border-solid">
              Contact
            </li>
          </Link>
                <Link legacyBehavior href="https://docs.google.com/document/d/e/2PACX-1vTsE1X1gCiak25rRwtwki9QWYYCKU9XOKHW2NCZaIaLYgZR9s-qMQJiflTZ6CY1Z_L1EZDKvr_PEyfJ/pub"
                  scroll={false}>
                  <a target="_blank" rel="noopener noreferrer">
                  <li className="text-lg uppercase hover:border-b hover:border-black hover:border-solid">
                    Resume
                  </li>
                  </a>
                </Link>
        </ul>
        <div className="z-10 flex items-center flex-1 lg:hidden">
         <Hamburger toggled={toggle} size={20} toggle={setToggle} />
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
                  <li className="ml-2 mb-4 text-base text-[20px] uppercase hover:border-b">
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
                  <li className="ml-2 mb-4 text-base text-[20px] uppercase hover:border-b">
                    About
                  </li>
                </Link>
                <Link href="/gallery" scroll={false}>
                  <li className="ml-2 mb-4 text-base text-[20px] uppercase hover:border-b">
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
                  <li className="ml-2 mb-4 text-base text-[20px] uppercase hover:border-b">
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
                  <li className="ml-2 mb-4 text-base text-[20px] uppercase hover:border-b">
                    Contact
                  </li>
                </Link>
                <Link legacyBehavior  href="https://docs.google.com/document/d/e/2PACX-1vTsE1X1gCiak25rRwtwki9QWYYCKU9XOKHW2NCZaIaLYgZR9s-qMQJiflTZ6CY1Z_L1EZDKvr_PEyfJ/pub"
                  scroll={false}>
                  <a target="_blank" rel="noopener noreferrer">
                  <li className="ml-2 mb-4 text-base text-[20px] uppercase hover:border-b">
                    Resume
                  </li>
                  </a>
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

export default Navbar