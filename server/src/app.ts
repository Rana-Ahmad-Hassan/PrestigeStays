import express, { Application } from 'express';
import dbConnect from '@/config/db';
import { configDotenv } from 'dotenv';
configDotenv()

const app:Application = express();
dbConnect()
app.use(express.json());

export default app;
