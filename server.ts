import express from 'express';
const app = express();
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();
import test from './routes/test';
import api from './routes/api';
import auth from './routes/auth';
import drive from './routes/drive';

const port: number = 8090;
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true}));

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('개발 관련 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync("uploads");
}

try {
  fs.readdirSync('imgMatch');
} catch (error) {
  console.error('개발 관련 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync("imgMatch");
}

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
