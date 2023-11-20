import express from 'express';
import pool from '../server/pool';
import path from 'path';
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/signIn', async (req, res, next) => {
  const userId = req.body.userId as string;
  const userPassword = req.body.userPassword as string;
  const sql = 'select * from users where id = ?';
  try {
    const [user] = await pool.query(sql, [userId]);
    if (Array.isArray(user) && user.length > 0) {
      const firstUserRow = user[0];
      if (firstUserRow && 'password' in firstUserRow) {
        const result = await bcrypt.compare(
          userPassword,
          firstUserRow.password
        );
        if (result) {
          return res.send('OK');
        } else {
          return res.send('비밀번호가 일치하지 않음');
        }
      } else {
        return res.send("user 행에 'password'가 없음");
      }
    } else {
      return res.send('가입되지 않은 아이디입니다.');
    }
  } catch (error) {
    console.log(error);
    next();
    return res.send('서버오류');
  }
});

export default router;
