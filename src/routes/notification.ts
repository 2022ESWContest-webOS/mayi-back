import express, { Request, Response } from 'express';

import wrapAsync from '@utils/wrapAsync';
import { getNotificationList } from '@database/controllers/notification';
import { BadRequestError } from '@errors/customErrors';
import { checkLoggedIn } from './middleware';

const router = express.Router();

// 알림 리스트 조회
router.get(
  '/',
  checkLoggedIn,
  wrapAsync(async (req: Request, res: Response) => {
    const { userId } = req;

    if (!userId) {
      throw new BadRequestError('올바르지 않은 userId를 포함한 요청입니다.');
    }

    const notificationList = await getNotificationList(userId);
    return res.json(notificationList);
  }),
);

export default router;
