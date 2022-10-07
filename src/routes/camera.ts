import express, { Request, Response } from 'express';

import wrapAsync from '@utils/wrapAsync';
import { getCameraList } from '@database/controllers/camera';
import { BadRequestError } from '@errors/customErrors';
import { checkLoggedIn } from './middleware';

const router = express.Router();

// TODO: 로그인 후 조회 가능하게
// 카메라 리스트 조회
router.get(
  '/',
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response) => {
    const { userId } = req;

    if (!userId) {
      throw new BadRequestError('올바르지 않은 userId를 포함한 요청입니다.');
    }

    const cameraList = await getCameraList(userId);
    return res.json(cameraList);
  }),
);

export default router;
