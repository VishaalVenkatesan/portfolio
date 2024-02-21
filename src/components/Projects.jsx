"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Projects = () => {
  const [selectedId, setSelectedId] = useState(null);
  const items = [
    { id: 1, title: 'First project' },
    { id: 2, title: 'Second one' },
    { id: 3, title: 'Third project' },
    { id: 4, title: 'Fourth project' },
  ];

  return (
    <section id="projects" className="w-full md:h-screen ">
      <div>
        <h1 className='font-serif text-5xl mb-7'>projects i made</h1>
        <div className='grid grid-cols-1 gap-y-[40px] sm:grid-cols-2'>
          {items.map(item => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              onClick={() => setSelectedId(item.id)}
              className="w-[40px]] h-[200px] text-2xl text-black bg-blue-100 rounded-[10px] 
              cursor-pointer hover:bg-blue-400 p-[20px] m-[40px]" 
            >
              <motion.h1>{item.title}</motion.h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

