import express, { Request, Response } from 'express';

import wrapAsync from '@utils/wrapAsync';
import { getNotificationList } from '@database/controllers/notification';
import { BadRequestError } from '@errors/customErrors';

const router = express.Router();

// TODO: 로그인 후 조회 가능하게
// 알림 리스트 조회
router.get(
  '/user/:userId',
  wrapAsync(async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    if (!userId) {
      throw new BadRequestError('올바르지 않은 userId를 포함한 요청입니다.');
    }

    const notificationList = await getNotificationList(userId);
    return res.json(notificationList);
  }),
);

export default router;
