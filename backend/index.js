import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api/auth',userRouter);



mongoose.connect(process.env.MONGOURL,{
    //useNewUrlPasrer:true,
    //useUnifiedTopology:true
}).then(()=>{
    console.log("Db connection successful")
}).catch((err)=>{
    console.log(err,err.message)
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Listening on Port ${process.env.PORT}`)
})

