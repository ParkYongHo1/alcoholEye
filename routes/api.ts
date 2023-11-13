import express from 'express';
import pool from '../server/pool';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
const router = express.Router();

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

router.get('/signUp', async (req, res, next) => {
  const userData = JSON.parse(req.query.data as string);
  const signUpSql = 'insert into users(id, password, name, address, image, birth, gender )values(?, ?, ?, ?, ?, ?, ?)';
  try {
    await pool.query(signUpSql, [userData.join_id, userData.join_pw, userData.join_username, userData.join_address, `${userData.join_id}.png`, userData.join_birth, userData.join_gender]);

    const base64: string = userData.join_img.replace(/^data:image\/\w+;base64,/, '');
    const binaryData = Buffer.from(base64, 'base64');
    const uploadDirRelative = '../uploads';
    const userImageFileName = `${userData.join_id}.png`;
    const imagePathRelative = path.join(uploadDirRelative, userImageFileName);
    const imagePath = path.join(__dirname, imagePathRelative);
    fs.writeFile(imagePath, binaryData, (err) => {
      if (err) console.error(err);
    });
    
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

export default router;
