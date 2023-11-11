import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port: number = 8090;
import test from './routes/test';
import pool from './server/pool';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/test', test);

app.get('/', async (req: Request, res: Response) => {
  const users = await pool.query(`SELECT * FROM test`);
  console.log(users);
  res.send('Hello');
});

app.listen(port, function () {
  console.log(`${port}번 포트에서 대기 중`);
});
