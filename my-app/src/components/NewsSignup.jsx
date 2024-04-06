import React, { useState } from 'react';
import {AiOutlineClose} from 'react-icons/ai';

const NewsSignup = ({ closeForm }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F1F1F1] rounded-xl p-6 shadow-xl">
      <AiOutlineClose onClick={closeForm} size={20} color='#3A3A3A' className="cursor-pointer absolute top-2 right-2"/>
      <div className="py-2 w-[400px]">Subscribe to our monthly newsletter!</div>
      <div className="py-2 w-[400px]">
        Subscribe to our mailing list to learn more about upcoming events and how to get involved in the CHEER community.
      </div>
      <form>
        <div className="grid grid-cols-1 mx-auto">
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="my-2 text-center rounded-full"/>
          <button type="submit" className="bg-[#DB7859] text-[#3A3A3A] font-semibold w-[75%] mx-auto rounded-full">Subscribe</button>
        </div>
      </form>
    </div>
  );
};


export default NewsSignup;
