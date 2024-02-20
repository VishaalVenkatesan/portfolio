"use client"
import { useState, useEffect } from "react"
import Image from "next/image";
import Link from "next/link";



const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);
  const handleClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }
  return (

    <div className="flex items-center justify-between w-full h-full p-[20px] ">
    <Link href="/#home" scroll={false}>
      <h1 className="font-serif text-4xl font-extrabold">VV.</h1>
    </Link>

    <div className="font-carlson">
      <ul style={{ color: "#1f2937" }} className="hidden md:flex">
        <Link href="/#home" scroll={false} onClick={() => handleClick('home')}>
          <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
        </Link>
        <Link href="/#about" scroll={false} onClick={() => handleClick('about')}>
          <li className="ml-10 text-sm uppercase hover:border-b">About</li>
        </Link>
        <Link href="/gallery" scroll={false} >
          <li className="ml-10 text-sm uppercase hover:border-b">Gallery</li>
        </Link>
        <Link href="/#projects" scroll={false} onClick={() => handleClick('projects')}>
          <li className="ml-10 text-sm uppercase hover:border-b">
            Projects
          </li>
        </Link>
        <Link href="/#contact" scroll={false} onClick={() => handleClick('contact')} >
          <li className="ml-10 text-sm uppercase hover:border-b">
            Contact
          </li>
        </Link>
      </ul>
      <div onClick={handleNav} className="cursor-pointer md:hidden">
      </div>
    </div>
  </div>
    
  )
}

export default Navbar
