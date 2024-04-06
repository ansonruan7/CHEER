import React from 'react';
import cheerBbqImage from './bbq.jpg';
import cheerEventImage from './event.jpg';
import cheerPhoto1Image from './photo1.jpg';

const Gallery = () => {
  return (
    <div className='h-screen'>
      <div className="grid grid-cols-3">
        <div className="p-6 m-6">
          <img src={cheerBbqImage} alt="CHEER BBQ" className="rounded w-full h-full object-cover" />
          <div className="mt-2 text-center text-lg font-bold">CHEER BBQ</div>
        </div>
        <div className="p-6 m-6">
          <img src={cheerEventImage} alt="CHEER Music Festival" className="rounded w-full h-full object-cover" />
          <div className="mt-2 text-center text-lg font-bold">CHEER Music Festival</div>
        </div>
        <div className="p-6 m-6">
          <img src={cheerPhoto1Image} alt="CHEER Moving Event" className="rounded w-full h-full object-cover" />
          <div className="mt-2 text-center text-lg font-bold">CHEER Moving Event</div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
