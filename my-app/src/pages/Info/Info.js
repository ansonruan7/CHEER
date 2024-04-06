import {React, useState, useEffect} from 'react';
import { FaPlusCircle } from "react-icons/fa";
import NewsletterCreation from '../../components/NewsletterCreation';

const Info = ({getAuth}) => {
    const [userType, setUserType] = useState('');
    const [newsList, setNewsList] = useState([]);
    let newsRetrieved = false;

    const [newsletterCreation, setNewsletterCreation] = useState(false)
    const handleNewsClick = () => {
        setNewsletterCreation(!newsletterCreation)
    }
    const closeForm = () => {
        setNewsletterCreation(false)
    }

    //Get newsletters
    const getNews = async () => {
        const response = await fetch(`/api/newsletter/retrieve`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        const data = await response.json();
        setNewsList(data);
        newsRetrieved = true;
    }

    useEffect(()=>{
        setUserType(getAuth());
        console.log('adming type: ' + userType);
    },[getAuth]);

    //Startup calls
    useEffect(() => {
        if(!newsRetrieved)
            getNews();

        //Dimming
        if (newsletterCreation) {
            document.body.classList.add('dimmed'); // Add the dimmed class to body
        } else {
            document.body.classList.remove('dimmed'); // Remove the dimmed class from body
        }

        return () => {
            // Cleanup function to remove the class when component unmounts
            document.body.classList.remove('dimmed');
        };
    },[]);
    
    return (
        <div>
            {userType==='Admin' && (
                <button onClick={handleNewsClick} className='m-6 bg-transparent text-black font-extrabold flex items-center hover:text-[#4169e2]'>
                Post a newsletter
                    <FaPlusCircle className='mx-2'/>
                </button>
            )
            }
            <div id='news-column' className='max-w-[800px] w-full mx-auto text-center flex flex-col justify-center p-6'>
                {newsList.map((newsletter, index) => {
                    return(
                        <div>
                            <div id='newsletter' key={index}>
                                <h1 className='mt-4 font-extrabold text-4xl'>{newsletter.newsName}</h1>
                                <h2 className='mt-4 font-semibold text-2xl'>{newsletter.newsYear}.{newsletter.newsMonth}.{newsletter.newsDay}</h2>
                                <p className='mt-4'>{newsletter.newsContent}</p>
                            </div>
                            <hr className='border-2 border-solid border-black w-full my-12'></hr>
                        </div>
                    );
                })}
            </div>
            {newsletterCreation && <NewsletterCreation closeForm={closeForm}/>}
            {/*<div className='grid grid-cols-3'>
            {eventsData.map((event, index) => (
                <div onClick={() => handleEventClick(event.eventID)}>
                <a href='newsletter1'>
                <Events
                    key={index} // Ensure each event has a unique key
                    eventName={event.eventName}
                    eventMonth={event.eventMonth}
                    eventDay={event.eventDay}
                    eventDescription={event.eventDescription}
                />
                </a>
                </div>
            ))}
            </div>*/}
        </div>
    )
}

export default Info;
