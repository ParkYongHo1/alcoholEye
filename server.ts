import express, { Request, Response } from 'express'
const app = express();
const port: number = 8090;
import test from './routes/test';

app.use("/test", test);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
})

app.listen(port, function () {
  console.log(`${port}번 포트에서 대기 중`);
})
