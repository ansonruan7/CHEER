import React from 'react';
import OLLI from '../Assets/OLLI LOGO.png'

const Logo = () => {
    return(
        <div className='flex items-center'>
            <img className='w-20 h-20 object-contain' src={OLLI} alt="OLLI" />
            <p className='text-[#DB7859] text-2xl font-extrabold mx-4'>OLLI NETWORK</p>
        </div>
    );
}

export default Logo;