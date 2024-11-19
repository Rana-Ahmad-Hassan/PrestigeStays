import 'tsconfig-paths/register'; // This for absolute imports like '@/'

import { Request, Response } from 'express';
import app from '@/app';
import env from '@/env';
import logger from '@/utils/logger';

app.get('/',(req:Request, res:Response) => {       
    res.send('Hello from PrestigeStays')
})

const PORT = env.PORT;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
