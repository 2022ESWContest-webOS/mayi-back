import express, { Request, Response, NextFunction } from 'express';

import wrapAsync from '@utils/wrapAsync';
import verify from '@auth/index';

const router = express.Router();

router.post(
  '/login',
  wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { uid, password } = req.body;

    const token = await verify(uid, password);
    return res.status(200).json({ token });
  }),
);

export default router;
