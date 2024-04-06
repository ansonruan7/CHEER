
import React from 'react';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import io from 'socket.io-client';
import ChatRoom from '../../components/ChatRoom';

const socket = io.connect('http://localhost:3001');

const Chat = () => {
    // function App() {
    // Creating a state for the username and room when user joins a chat
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "") {
            socket.emit('join_room', room);
            setShowChat(true);
        }
    }

                    return (
                    <div className='ChatApp'>
                        {!showChat ? (
                            <div className='joinChatContainer'>
                                <h3>Join a Chat</h3>

                                <input
                                    type="text"
                                    id='usernameInput'
                                    placeholder="Enter your name..."
                                    // Sets the username when user joins using event.target.value keeping track of who's chatting 
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                        setRoom(1);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            setUsername(event.target.value);
                                            setRoom(1);
                                            joinRoom();
                                        }
                                    }}
                                />

                                {/* DOESNT NEED A SET ROOM IF ONLY 1 ROOM IS REQUIRED */}
                                {/* <input 
                        type="text" 
                        id='roomInput'
                        placeholder="Enter room ID..."
                        // Sets the room ID when user types in the room ID
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    /> */}
                                <button onClick={joinRoom}>Join a room</button>
                            </div>
                        ) : (
                            <ChatRoom socket={socket} username={username} room={room} />
                        )}
                    </div>
                    );
            }

            
                     

export default Chat;
