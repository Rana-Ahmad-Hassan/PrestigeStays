import express, { Application } from 'express';
import expressPinoLogger from 'express-pino-logger';
import logger from '@/utils/logger';


const app:Application = express();

app.use(expressPinoLogger({ logger:logger as any }));
app.use(express.json());

export default app;
