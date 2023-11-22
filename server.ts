import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
dotenv.config();
const app = express();
const port: number = 8090;
import test from './routes/test';
import api from './routes/api';
import auth from './routes/auth';
import drive from './routes/drive';
import pool from './server/pool';
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true}));

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없습니다. uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      const user = JSON.parse(req.body.UserData)['nameValuePairs'];
      done(null, `${user.id}.jpg`);
    },
    destination(req, file, done) {
      done(null, path.join(__dirname, "uploads"));
    },
  }),
});
const uploadMiddleware = upload.single('join_img');

app.use(uploadMiddleware);
app.use(express.static(path.join(__dirname, "front/build")));
app.use('/test', test); 
app.use('/api', api);
app.use('/auth', auth);
app.use('/drive', drive);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/front/build/index.html"));
});

app.listen(port, function () {
  console.log(`${port}번 포트에서 대기 중`);
});
