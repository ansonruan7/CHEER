// // 'npm start' to start
// const express = require('express');
// const app = express();
// const http = require('http');
// const cors = require('cors');
// const { Server } = require("socket.io");

// app.use(cors());

// const server = http.createServer(app);

// // Connecting server with the socket.io
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000", // Which server is making calls to the server (React server on frontend)
//         methods: ["GET", "POST"],
//     }
// });

// // Listen for a connection/disconnection events
// io.on('connection', (socket) => {
//     console.log(`User: ${socket.id} connected`);

//     socket.on('join_room', (room) => {
//         socket.join(room);
//         console.log(`User with ID: ${socket.id} joined room: ${room}`);
//     });

//     socket.on('send_message', (data) => {
//         socket.to(data.room).emit('receive_message', data);
//     });

//     socket.on('disconnect', () => {
//         console.log(`User: ${socket.id} disconnected`);
//     });
// });

// server.listen(3001, () => {
//     console.log('Server is running on port 3001');
// });
