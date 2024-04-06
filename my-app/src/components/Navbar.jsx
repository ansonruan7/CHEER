import { React, useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from './Logo';
import FaceIcon from '@mui/icons-material/Face';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CameraEnhanceRoundedIcon from '@mui/icons-material/CameraEnhanceRounded';
import EventNoteRoundedIcon from '@mui/icons-material/Newspaper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Navbar = ({ uType }) => {
    const [nav, setNav] = useState(false);
    const [userType, setUserType] = useState('');

    const handleNav = function () {
        setNav(!nav);
    }

    useEffect(() => {
        if (nav) {
            document.body.classList.add('dimmed'); // Add the dimmed class to body
        } else {
            document.body.classList.remove('dimmed'); // Remove the dimmed class from body
        }

        return () => {
            // Cleanup function to remove the class when component unmounts
            document.body.classList.remove('dimmed');
        };
    }, [nav]);
    useEffect(() => {
        setUserType(uType);
        console.log('navbar type: ' + uType);
    }, [uType]);

    return (
        <div>
            <ul className='list-none justify-between px-20 py-7 hidden bg-[#FFF] w-full align-center lg:flex'>
                <li className='my-auto flex items-center'>
                    <Logo />
                </li>
                <div className='flex items-center'>
                    <div className='flex-col items-center'>
                        <a className='flex-col items-center' href="/">
                            <HomeRoundedIcon style={{fontSize: 100}} />
                            <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>Home</span>
                        </a>
                    </div>
                    {(userType === 'Parent' || userType === 'Admin') && (
                        <div className='flex-col items-center'>
                            <a className='flex-col items-center' href="gallery">
                                <CameraEnhanceRoundedIcon style={{fontSize: 100}} />
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>Gallery</span>
                            </a>
                        </div>
                    )}
                    {(userType === 'Parent' || userType === 'Admin') && (
                        <div className='flex-col items-center'>
                            <a className='flex-col items-center' href="info">
                                <EventNoteRoundedIcon style={{fontSize: 100}} />
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>Newsletter</span>
                            </a>
                        </div>
                    )}
                    {(userType === 'Parent' || userType === 'Admin') && (
                        <div className='flex-col items-center'>
                            <a className='flex flex-col items-center' href="privRegister">
                                <PersonAddAlt1Icon style={{fontSize: 100}} />
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>Register My Child</span>
                            </a>
                        </div>
                    )}
                    {(userType === 'Admin') && (
                        <div className='flex-col items-center'>
                            <a className='flex-col items-center' href="accounts">
                                <ChatRoundedIcon style={{fontSize: 100}} /> 
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>Account Centre</span>
                            </a>
                        </div>
                    )}
                    {(userType === 'Employee' || userType === 'Admin') && (
                        <div className='flex-col items-center'>
                            <a className='flex-col items-center' href="clockinout">
                                <AccessTimeIcon style={{fontSize: 100}} />
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>ClockInOut</span>
                            </a>
                        </div>
                    )}
                    {/* PROTECT THE CHAT ROUTE and NAV BAR DISPLAY WITH USER LOGIN */}
                    {(userType === "Private" || userType === 'Admin') && (
                        <div className='flex-col items-center'>
                            <a className='flex-col items-center' href="chat">
                                <ChatRoundedIcon style={{fontSize: 100}} />
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>Chat</span>
                            </a>
                        </div>
                    )}
                    {!userType && (
                        <div className='flex-col items-center'>
                            <a className='flex-col items-center' href="login">
                                <FaceIcon style={{fontSize: 100}} />
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>LOGIN</span>
                            </a>
                        </div>
                    )}
                    {!userType && (
                        <div className='flex-col items-center'>
                            <a className='flex-col items-center' href="register">
                                <PersonAddAlt1Icon style={{fontSize: 100}} />
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]'>REGISTER</span>
                            </a>
                        </div>
                    )}
                    {userType && (
                        <div className='flex-col items-center'>
                            <a className='flex-col items-center' onClick={() => localStorage.clear()} href="/">
                                <PersonAddAlt1Icon style={{fontSize: 100}} />
                                <span className='flex text-[#3A3A3A] text-sm font-extrabold px-2 text-center items-center justify-center py-[10%]' href="/">LOG OUT</span>
                            </a>
                        </div>
                    )}
                </div>

            </ul>
            <div onClick={handleNav} className='flex justify-end lg:hidden'>
                {nav ? <AiOutlineClose size={40} color='#3A3A3A' /> : <AiOutlineMenu size={40} color='#3A3A3A' />}
            </div>
            <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-[#DB7859] bg-[#FFF] ease-in-out duration-500' : 'fixed left-[-500%]'}>
                <ul className='uppercase p-4'>
                    <li className='my-auto'>
                        <Logo />
                    </li>
                    <div className='flex items-center'>
                        <HomeRoundedIcon style={{ fontSize: 100, marginTop: '20px' }} />
                        <a className='inline-block border-[#DB7859] border-b w-full text-[#3A3A3A] text-sm font-extrabold p-4' href="/">Home</a>
                    </div>
                    {(userType === 'Parent' || userType === 'Admin') && (
                        <div className='flex items-center'>
                            <CameraEnhanceRoundedIcon style={{ fontSize: 100 }} />
                            <a className='inline-block border-[#DB7859] border-b w-full text-[#3A3A3A] text-sm font-extrabold p-4' href="gallery">Gallery</a>
                        </div>
                    )}
                    {(userType === 'Parent' || userType === 'Admin') && (
                        <div className='flex items-center'>
                            <EventNoteRoundedIcon style={{ fontSize: 100 }} />
                            <a className='inline-block border-[#DB7859] border-b w-full text-[#3A3A3A] text-sm font-extrabold p-4' href="info">Newsletter</a>
                        </div>
                    )}
                    {/* PROTECT THE CHAT ROUTE and NAV BAR DISPLAY WITH USER LOGIN */}
                    {(userType === 'Private' || userType === 'Admin') && (
                        <div className='flex items-center'>
                            <ChatRoundedIcon style={{ fontSize: 100 }} />
                            <a className='inline-block border-[#DB7859] border-b w-full text-[#3A3A3A] text-sm font-extrabold p-4' href="chat">Chat</a>
                        </div>
                    )}
                    {!userType && (
                        <div className='flex items-center'>
                            <FaceIcon style={{ fontSize: 100 }} />
                            <a className='inline-block border-[#DB7859] border-b w-full text-[#647249] text-sm font-extrabold p-4' href="login">LOGIN</a>
                        </div>
                    )}
                    {!userType && (
                        <div className='flex items-center'>
                            <PersonAddAlt1Icon style={{ fontSize: 100 }} />
                            <a className='inline-block border-[#DB7859] border-b w-full text-[#647249] text-sm font-extrabold p-4' href="register">REGISTER</a>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;