import express, { Request, Response, Router } from 'express'
const router: Router = express.Router();

router.get('/admin', (req: Request, res: Response) => {
  return res.status(200).json({
    admin: "문진호, 전준호, 박용호"
  });
})

export default router
