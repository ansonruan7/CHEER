import React, { useState } from 'react';
import {AiOutlineClose} from 'react-icons/ai';

const NewsletterCreation = ({ closeForm }) => {
    const [newsName, setNewsName] = useState('');
    const [newsDay, setNewsDay] = useState('');
    const [newsMonth, setNewsMonth] = useState('');
    const [newsYear, setNewsYear] = useState('');    
    const [newsContent, setNewsContent] = useState('');

    //Send to database
    const newsPost = async () => {
        const doc = {
            name: newsName,
            year: newsYear,
            month: newsMonth,
            day: newsDay,
            content: newsContent
          }
        const response = await fetch(`/api/newsletter/create`,{
            method: 'POST',
            body: JSON.stringify(doc),
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
            throw new Error('Request failed');
        }
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#dddddd] rounded-xl p-6 shadow-xl px-8">
        <AiOutlineClose onClick={closeForm} size={20} color='#3A3A3A' className="cursor-pointer absolute top-2 right-2"/>
        <form className='grid grid-cols-1 mx-auto items-start'>
            Newsletter Title
            <input type="text" placeholder='Newsletter Title' className="my-2 rounded-lg p-2" onChange={(e) => setNewsName(e.target.value)}/>
            Date
            <div className='flex '>
                <input type="text" placeholder='Day' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setNewsDay(e.target.value)}/>
                <input type="text" placeholder='Month' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setNewsMonth(e.target.value)}/>
                <input type="text" placeholder='Year' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setNewsYear(e.target.value)}/>
            </div>
            Body
            <textarea type="text" placeholder="We're happy to annouce that..." className="my-2 rounded-lg w-full h-[400px] p-2" onChange={(e) => setNewsContent(e.target.value)}/>
            <button onClick={newsPost} type="submit" className="bg-[#DB7859] text-[#3A3A3A] font-semibold w-[75%] mx-auto rounded-lg py-2">Post</button>
        </form>
        </div>
    );
};


export default NewsletterCreation;
