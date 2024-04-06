import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function ChatRoom({ socket, username, room }) {
    const [currentMsg, setCurrentMsg] = useState('');
    const [msgList, setMsgList] = useState([]);

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMsgList((list) => [...list, data]);
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);

    const sendMessage = async () => {
        if (currentMsg.trim() !== '') {
            const msgData = {
                room: room,
                author: username,
                message: currentMsg,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            await socket.emit('send_message', msgData);
            setMsgList((list) => [...list, msgData]);
            setCurrentMsg('');
        }
    };

    const speakMessage = (message) => {
        const speechSynthesis = window.speechSynthesis;
        if ('speechSynthesis' in window && message) {
            const utterance = new SpeechSynthesisUtterance(message);

            // Filter voices to get a child's voice
            const voices = speechSynthesis.getVoices();
            const childVoice = voices.find(voice => voice.name === 'Google UK English Female');

            // Set the voice attribute to the child's voice
            utterance.voice = childVoice;

            speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {msgList.map((msgContent, index) => (
                        <div key={index} className='message' id={username === msgContent.author ? "you" : "other"}
                            onClick={() => speakMessage(msgContent.message)}>
                            <div>
                                <div className='message-content'>
                                    <p className='msgBubble'>{msgContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id='time'>{msgContent.time}</p>
                                    <p id='author'>{msgContent.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type='text'
                    id='messageInput'
                    placeholder='Type a message...'
                    value={currentMsg}
                    onChange={(event) => setCurrentMsg(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default ChatRoom;
