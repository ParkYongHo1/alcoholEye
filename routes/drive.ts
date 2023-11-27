import express, { Router } from 'express';
import pool from '../server/pool';
import fs from 'fs';
import path from 'path';
const router: Router = express.Router();

router.get('/driverInfo/:userNumber', async (req, res) => {
  const { userNumber } = req.params;
  const sql = 'SELECT * FROM users where uno=?';
  try {
    const [result] = await pool.query(sql, [userNumber]);
    const user = Array.isArray(result) ? result[0] : result;
    if (user && 'image' in user) {
      const data = fs.readFileSync(path.join(__dirname, `../uploads/${user.image}`));
      const base64ImageData = Buffer.from(data).toString('base64');
      const imgData = `data:image/png;base64,${base64ImageData}`;
      res.json({ result: result[0], imgData });
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
