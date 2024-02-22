"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);


  const items = [
    { id: 1, title: 'First project', info: 'Info about first project' },
    { id: 2, title: 'Second one', info: 'Info about second project' },
    { id: 3, title: 'Third project', info: 'Info about third project' },
    { id: 4, title: 'Fourth project', info: 'Info about fourth project' },
  ];

  const handleClick = (item) => {
    setSelectedItem(selectedItem !== item ? item : null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
      }, []);

  return (
    <section id="projects" className="w-full md:h-screen  relative pt-[40px] sm:pt-[2px]">
      <h1 className='font-serif text-5xl mb-7'>projects i made</h1>
      <div className='flex justify-center items-center'>
        <div className='sm:grid sm:grid-cols-2 gap-2 sm:gap-4 flex flex-col'>
          {items.map(item => (
            <motion.div
              key={item.id}
              onClick={() => handleClick(item)}
              className={`${isMobile ? '' : 'w-[200px] h-[200px]'} text-2xl text-black bg-blue-100 rounded-[10px] 
              cursor-pointer hover:bg-blue-400 p-[20px] m-[40px]`}
            >
              <h1>{item.title}</h1>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <>
          <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
          <motion.div
            layoutId={selectedItem.id}
            className={`fixed ${isMobile ? 'top-[10%] left-[7%] w-[70%] h-[40%]' : 'top-[30%] left-[30%] w-[400px] h-[300px]'} transform -translate-x-1/2 -translate-y-1/2 z-20 text-2xl text-black bg-blue-100 rounded-[10px] 
            cursor-pointer hover:bg-blue-400 p-[20px] m-[40px]`}
            onClick={() => setSelectedItem(null)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1>{selectedItem.title}</motion.h1>
            <motion.p>{selectedItem.info}</motion.p>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default Projects;