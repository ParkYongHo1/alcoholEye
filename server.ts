import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const app = express();
const port: number = 8090;
import test from './routes/test';
import api from './routes/api';
import pool from './server/pool';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error("uploads 폴더가 없습니다. uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

app.use('/test', test);
app.use('/api', api);

app.get('/', async (req: Request, res: Response) => {
  const users = await pool.query(`SELECT * FROM test`);
  console.log(users);
  res.send('Hello');
});

app.listen(port, function () {
  console.log(`${port}번 포트에서 대기 중`);
});
