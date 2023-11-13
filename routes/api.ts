import express from 'express';
import pool from '../server/pool';
const router= express.Router();

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

export default router;