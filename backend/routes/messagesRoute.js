import express from 'express';
import { addMessage, checkOnline, getAllMessage } from '../controller/messagesController.js';

const messageRouter = express.Router();

messageRouter.post('/addMessage',addMessage)
messageRouter.post('/getMessage',getAllMessage)
messageRouter.post('/checkOnline',checkOnline)
export default messageRouter;