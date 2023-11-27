import express, { Request, Response, Router } from 'express';
import pool from '../server/pool';
import bcrypt from 'bcrypt';
import User from '../model/User';
const router: Router = express.Router();

// 모든 운전자 정보 불러오기
router.get('/allDriverInfo', async (req, res) => {
  const driverInfoSql = 'SELECT users.uno , users.id, users.name, users.birth, users.gender, result.bus_data, result.alcohol_data, date_format(result.reg_date, "%y-%m-%d-%H:%i") as reg_date FROM users join result on users.id = result.id';
  try {
    const [driver] = await pool.query(driverInfoSql);
    if(Array.isArray(driver)) {
      if(driver.length > 0) res.json({ result: driver });
      else res.json({ result: false, message: '운전자 정보를 불러오는데 실패 했습니다.'});
    }
  } catch (err) {
    console.error('데이터베이스 오류:', err);
    res.status(500).json({ result: false, message: '서버 오류' });
  }
});

// 운전자 정보 상세 보기
router.post('/driverInfo/:userNumber', async (req, res) => {
  const { userNumber } = req.params;

  const sql = 'SELECT * FROM users where userNum=?';
  try {
    const user:User = await pool.query(sql, [userNumber])[0]
    console.log(user.image);
    
  } catch (err) {
    console.error('데이터베이스 오류:', err);
    res.status(500).json({ result: false, message: '서버 오류' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  const userId = req.body.userId;
  const userPassword = req.body.userPassword;
  const sql = 'SELECT * FROM users WHERE userId = ? and userPassword=?';

  try {
    const results: Array<any> = await pool.query(sql, [userId, userPassword]);

    if (results[0].length > 0) {
      res.json({ result: true, id: userId });
    } else {
      res.json({
        result: false,
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
      });
    }
  } catch (err) {
    console.error('데이터베이스 오류:', err);
    res.status(500).json({ result: false, message: '서버 오류' });
  }
});
//   const { userId, userPassword } = req.body;
//   const sql = 'SELECT * FROM users WHERE userId = ?';

//   try {
//     const results = pool.query(sql, [userId]);

//     if ((await results).length > 0) {
//       const user = results[0];

//       // 비밀번호 체크
//       // const bcryptResult = new Promise((resolve) => {
//       //   bcrypt.compare(
//       //     userPassword,
//       //     user.userPassword,
//       //     (bcryptErr, bcryptResult) => {
//       //       resolve({ bcryptErr, bcryptResult });
//       //     }
//       //   );
//       // });

//       // if (bcryptResult.bcryptErr || !bcryptResult.bcryptResult) {
//       //   // 비밀번호가 일치하지 않음
//       //   res.json({
//       //     result: false,
//       //     message: '아이디 또는 비밀번호가 일치하지 않습니다.',
//       //   });
//       // } else {
//       //   // 로그인 성공
//       //   res.json({ result: true, id: userId });
//       // }
//     } else {
//       // 사용자가 없음
//       res.json({
//         result: false,
//         message: '아이디 또는 비밀번호가 일치하지 않습니다.',
//       });
//     }
//   } catch (err) {
//     console.error('데이터베이스 오류:', err);
//     res.status(500).json({ result: false, message: '서버 오류' });
//   }
// });
export default router;
