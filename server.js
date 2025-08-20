import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import taskRouter from './routes/TaskRoutes.js';
import userRouter from './routes/userRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';

//useless code
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(path.join(__dirname, '.env'));


const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('database connected!');
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/user', userRouter);
app.use('/api', taskRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})