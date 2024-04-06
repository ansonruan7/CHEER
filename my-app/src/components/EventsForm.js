import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';

const EventsForm = ({ closeForm }) => {

  return (
    <div className="bg-[#F1F1F1] rounded-xl p-8 shadow-xl" style={{ width: '450px'}}>
      <AiOutlineClose onClick={closeForm} size={20} color='#3A3A3A' className="cursor-pointer absolute top-2 right-2"/>
      <div className="py-2 w-[400px]" style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
      Sign up as a volunteer for this event</div>
      <div className="py-2 w-[400px]">
        Sign up as a volunteer for our events. Please list all the events you want to sign up for, separated by commas.
      </div>
      <form>
        <div className="grid grid-cols-1 mx-auto">
          <input type="email" placeholder='Email' className="my-2 text-center rounded-full"/>
          <input type="full-name" placeholder='Full Name' className="my-2 text-center rounded-full"/>
          <button type="submit" className="bg-[#DB7859] text-[#3A3A3A] font-semibold w-[75%] mx-auto rounded-full">Sign up</button>
        </div>
      </form>
    </div>
  );
};


export default EventsForm;
