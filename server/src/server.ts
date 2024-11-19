import { Request, Response } from 'express';
import app from './app';

app.get('/',(req:Request, res:Response) => {
    res.send('Hello from PrestigeStays')
})

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
