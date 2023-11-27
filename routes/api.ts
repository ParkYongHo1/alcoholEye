import express from 'express';
import pool from '../server/pool';
import bcrypt from 'bcrypt';
import User from '../model/User';
import multer from 'multer';
import path from 'path';

const faceMatch = require('./faceMatch.js');
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      if(req.route.path === '/checkUserImg') {
        const user = JSON.parse(req.body.userId)['nameValuePairs'];
        done(null, `${user.id}.jpg`);
      }
      if(req.route.path === '/signUp') {
        const user = JSON.parse(req.body.UserData)['nameValuePairs'];
        done(null, `${user.id}.jpg`);
      }
    },
    destination(req, file, done) {
      if(req.route.path === '/checkUserImg') done(null, path.join(__dirname, "../imgMatch"));
      if(req.route.path === '/signUp') done(null, path.join(__dirname, "../uploads"));
    },
  }),
});

router.get('/idCheck', async (req, res, next) => {
  const user = JSON.parse(req.query.data as string);
  console.log(user);
  const idCheckSql = 'select * from users where id = ?';
  try {
    const [result] = await pool.query(idCheckSql, [user.id]);
    if(Array.isArray(result)) return result.length > 0 ? res.send("아이디가 존재합니다.") : res.send("OK");
    else console.log("쿼리 성공");
  } catch (error) {
    console.log(error);
    next();
  }
});

router.post('/signUp', upload.single('join_img'), async (req, res, next) => {
  const user:User = JSON.parse(req.body.UserData)['nameValuePairs'];
  const signUpSql = 'insert into users(id, password, name, address, image, birth, gender )values(?, ?, ?, ?, ?, ?, ?)';
    try {
    await pool.query(signUpSql, [user.id, user.pw, user.name, user.address, `${user.id}.jpg`, user.birth, user.gender]);
    return res.send("OKSignUp");
  } catch (error) {
    console.log(error);
    next();
  }
  return res.status(500);
});

router.get('/signIn', async (req, res, next) => {
  const userData = JSON.parse(req.query.data as string);
  const userSelectSql = 'select * from users where id = ?';
  try {
    const [user] = await pool.query(userSelectSql, [userData.id]);
    if (Array.isArray(user) && user.length > 0) {
      const firstUserRow = user[0];
      if (firstUserRow && 'password' in firstUserRow) {
        const result = await bcrypt.compare(userData.pw, firstUserRow.password);
        if (result) {
          return res.send("OK");
        } else {
          return res.send("비밀번호가 일치하지 않음");
        }
      } else {
        return res.send("user 행에 'password'가 없음");
      }
    } else {
      return res.send("가입되지 않은 아이디입니다.");
    }
  } catch (error) {
    console.log(error);
    next();
    return res.send("서버오류");
  }
});

router.post('/checkUserImg', upload.single('check_img'), async (req, res) => {
  const user = JSON.parse(req.body.userId)['nameValuePairs'];
  const isFaceMatched = await faceMatch(user.id);

  if(isFaceMatched === 404) {
    return res.status(200).send("등록되지 않은 이미지 입니다.");
  } else {
    if(isFaceMatched) {
      return res.status(200).send("OK");
    } else {
      return res.status(200).send("NO");
    }
  }
});

router.get('/alcohol', async (req, res, next) => {
  const alcoholData = JSON.parse(req.query.alcoholData as string);
  const alcoholDataSql = 'insert into result( id, alcohol_data, bus_data, reg_date )values(?, ?, ?, NOW())';
  try {
    await pool.query(alcoholDataSql, [alcoholData.id, alcoholData.alcohol, alcoholData.busName]);
    return res.send("OK");
  } catch (error) {
    console.log(error);
    next();
    return res.send("NO");
  }
});

export default router;
