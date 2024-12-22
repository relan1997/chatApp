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
  origin: '*', // Match this with your frontend URL
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

let onlineUsers = [];

io.on('connection', (socket) => {
  socket.on('add-user', (userId) => {
    console.log("Add User from Backend")
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
      console.log('New User Added:', onlineUsers);
    }
    io.emit('get-users', onlineUsers); // Emit consistent event
    console.log("Get users called along with add user")
  });

  socket.on('send-msg', (data) => {
    console.log("Message Sent event from Backend")
    const sendUser = onlineUsers.find((user) => user.userId === data.to); // Fix filtering
    if (sendUser) {
      socket.to(sendUser.socketId).emit('msg-received', data.message);
      io.emit('get-users', onlineUsers);
    }
  });

  socket.on('disconnect', () => {
    console.log("Disconnect Event from Backend")
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log('User Disconnected:', onlineUsers);
    io.emit('get-users', onlineUsers);
  });

  socket.on('offline', () => {
    console.log("Offline Event from backend")
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log('User is Offline:', onlineUsers);
    io.emit('get-users', onlineUsers);
  });
});