import React from 'react';

const Events = ({ eventName, eventMonth, eventDay, eventDescription, eventImage}) => {
    return (  
        <div className='mx-8 mt-14 rounded-2xl bg-white shadow-xl hover:scale-[102.5%] ease-in-out duration-300'>
            <div className='flex p-2'>
                <div className='flex-col mx-4 text-center justify-start'>
                    <p className='font-extrabold'>{eventMonth}</p>
                    <p>{eventDay}</p>
                </div>
                <div className=''>
                    <p className='font-semibold'>{eventName}</p>
                    <p className='text-xs'>{eventDescription}</p>
                </div>
            </div>
        </div>
        );
  }

export default Events;