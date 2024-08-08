import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messagesRoute.js';
import { Server } from 'socket.io';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Match this with your frontend URL
  credentials: true,
}));

app.use(express.json());
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);

mongoose.connect(process.env.MONGOURL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err, err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Match this with your frontend URL
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  
  socket.on('add-user', (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-received', data.message);
    }
  });

  socket.on('disconnect', () => {
    // Iterate through the entries to find and remove the key
    for (let [userId, socketId] of global.onlineUsers.entries()) {
        if (global.onlineUsers.has(userId)) {
            global.onlineUsers.delete(userId);
            console.log(`User disconnected: ${userId}`);
            break; // Exit the loop after removing the user
        }
    }
});

});

