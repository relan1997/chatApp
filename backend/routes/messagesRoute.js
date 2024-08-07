import express from 'express';
import { addMessage, getAllMessage } from '../controller/messagesController.js';

const messageRouter = express.Router();

messageRouter.post('/addMessage',addMessage)
messageRouter.post('/getMessage',getAllMessage)
export default messageRouter;