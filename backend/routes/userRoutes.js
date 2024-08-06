import express from 'express';
import { login, register, setAvatar } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login)
userRouter.post('/setAvatar/:id',setAvatar)
export default userRouter;