import express, { Request, Response, Router } from 'express';
import pool from '../server/pool';
import bcrypt from 'bcrypt';
const router: Router = express.Router();
router.post('/driverInfo/:userNumber', async (req, res) => {
  const { userNumber } = req.params;
  console.log(userNumber);

  const sql = 'SELECT * FROM users where uno=?';
  try {
    const results: Array<any> = await pool.query(sql, [userNumber]);

    if (results[0].length > 0) {
      console.log(results);

      res.json({ result: results[0] });
    } else {
      res.json({
        result: false,
        message: '운전자 정보를 불러오는데 실패 했습니다.',
      });
    }
  } catch (err) {
    console.error('데이터베이스 오류:', err);
    res.status(500).json({ result: false, message: '서버 오류' });
  }
});
router.get('/driverInfo/:userNumber', async (req, res) => {
  const { userNumber } = req.params;
  console.log(userNumber);

  const sql = 'SELECT * FROM users where uno=?';
  try {
    const results: Array<any> = await pool.query(sql, [userNumber]);

    if (results[0].length > 0) {
      console.log(results);

      res.json({ result: results[0] });
    } else {
      res.json({
        result: false,
        message: '운전자 정보를 불러오는데 실패 했습니다.',
      });
    }
  } catch (err) {
    console.error('데이터베이스 오류:', err);
    res.status(500).json({ result: false, message: '서버 오류' });
  }
});
export default router;
