import { React, useState, useEffect } from 'react';
import OLLI from '../../Assets/OLLI LOGO.png';
import CHEER from '../../Assets/cheerconnections.png';
import NewsSignup from '../../components/NewsSignup.jsx';
import Navbar from '../../components/Navbar.jsx';
import { FaVolumeHigh } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

function Home({ uType }) {
    const [newsForm, setNewsForm] = useState(false);
    const [userType, setUserType] = useState(uType);
    const [synthesis, setSynthesis] = useState(null); // State to store SpeechSynthesisUtterance object

    const handleNewsClick = () => {
        setNewsForm(!newsForm);
    }

    const closeForm = () => {
        setNewsForm(false);
    }

    useEffect(() => {
        setUserType(uType);
    }, [uType]);

    useEffect(() => {
        if (newsForm) {
            document.body.classList.add('dimmed'); // Add the dimmed class to body
        } else {
            document.body.classList.remove('dimmed'); // Remove the dimmed class from body
        }

        return () => {
            // Cleanup function to remove the class when component unmounts
            document.body.classList.remove('dimmed');
        };
    }, [newsForm]);

    // Function to speak a given text
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);

            // Filter voices to get the desired voice
            const voices = window.speechSynthesis.getVoices();
            const desiredVoice = voices.find(voice => voice.name === 'Google UK English Female');

            // Set the voice attribute to the desired voice
            if (desiredVoice) {
                utterance.voice = desiredVoice;
            } else {
                console.error('Desired voice not found.');
            }

            speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-speech is not supported in your browser.');
        }
    };

    return (
        <div>
            <div className='flex text-center w-full'>
                <div className={`lg:grid lg:grid-cols-2 items-center justify-center text-center ${newsForm ? 'brightness-50' : ''}`}>
                    <div className='items-center my-auto'>
                        <div className="flex m-auto items-center flex-col w-[75%]">
                            <p className='w-inherit text-[#DB7859] text-[60px] font-semibold'>Welcome to the OLLI NETWORK</p>
                            <button onClick={handleNewsClick} className='text-white font-semibold w-[450px] inline-flex my-4 justify-center py-[10px] px-[82px] rounded-md shadow-md bg-[#498184]
                            hover:scale-[102.5%] ease-in duration-75 hover:bg-[#6daeb1]'>Signup for Newsletter</button>
                            {userType && (
                                <a href='calendar'>
                                    <button className='text-white font-semibold w-[450px] inline-flex my-4 justify-center items-center py-[10px] px-[82px] rounded-md shadow-md bg-[#EE807E] hover:scale-[102.5%] ease-in duration-75 hover:bg-[#ea8f8d]'>
                                        <FaCalendarAlt size={50}/>
                                        Calendar
                                    </button>
                                </a>
                            )}
                            <div>
                                <p className='font-semibold text-lg py-4'>Operating Hours</p>
                                Monday: 8:00am-4:00pm<br></br>
                                Tuesday: 8:00am-4:00pm<br></br>
                                Wednesday: 10:00am-4:00pm<br></br>
                                Thursday: 8:00am-4:00pm<br></br>
                                Friday: 8:00am-4:00pm<br></br>
                                Saturday: CLOSED<br></br>
                                Sunday: CLOSED<br></br>
                            </div>
                        </div>
                    </div>
                    <div className='m-auto p-auto'>
                        <br></br><br></br><br></br>
                        <div id='row1' className='italic my-auto'>
                            <p>Vision Statement—
                                To be a community of inclusion and
                                a circle of friendship that supports
                                and enhances the lives of our loved
                                ones with intellectual disabilities as
                                well as the whole family.
                                <FaVolumeHigh IoMdTrash size={40} onClick={() => speakText('Vision Statement— To be a community of inclusion and a circle of friendship that supports and enhances the lives of our loved ones with intellectual disabilities as well as the whole family.')} className="text-blue-500 hover:underline ml-auto" />
                            </p>
                        </div>
                        <div id='row2' className='flex items-center justify-end m-6 px-12'>
                            <img alt='CHEER logo' src={OLLI} className='w-[25%] mx-12'></img>
                            <p>OLLI is a registered not-for-profit
                                caregiver driven company with
                                four areas of focus: Cheer Group;
                                Cheer Works; Cheer Connections;
                                and, Cheer Living.
                                <FaVolumeHigh IoMdTrash size={40} onClick={() => speakText('OLLI is a registered not-for-profit caregiver driven company with four areas of focus: Cheer Group Cheer Works; Cheer Connections and, Cheer Living.')} className="text-blue-500 hover:underline ml-auto" />
                            </p>
                        </div>
                        <div id='row3' className='flex items-center justify-start m-6 px-12'>
                            <p>Caregiver social and support
                                group, creators and administrators
                                of all things C.H.E.E.R.
                                <FaVolumeHigh IoMdTrash size={40} onClick={() => speakText('Caregiver social and support group, creators and administrators of all things C.H.E.E.R.')} className="text-blue-500 hover:underline ml-auto" />
                            </p>
                            <img alt='CHEER logo' src={CHEER} className='w-[35%] mx12'></img>
                        </div>
                    </div>
                </div>
                {newsForm && <NewsSignup closeForm={closeForm} />}
            </div>
        </div>
    )
}

export default Home;
