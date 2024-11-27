import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectDB} from './db.js'
import authRoutes from './routes/auth_routes.js'
import taskRoutes from './routes/tasks_routes.js'
import userRoutes from './routes/user_routes.js'
import path from 'path'

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

import { fileURLToPath } from 'url';

// Configura _dirname correctamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildpath = path.join(__dirname, "../client/dist");
app.use(express.static(buildpath));

// CORS
app.use(
    cors({
      origin: 'http://localhost:5173', // Front End
      credentials: true, // Allow cookies
    })
  );

app.use(morgan('dev'));

app.use('/', authRoutes);
app.use('/', taskRoutes);
app.use('/', userRoutes);

connectDB();

app.listen(3000, () => {
    console.log('Running on port 3000');
})