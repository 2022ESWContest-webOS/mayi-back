import AppDataSource from '@database/dataSource';
import Notification from '@database/entities/notification';

// 알림 목록 조회
export const getNotificationList = async (userId: number) => {
  const notificationList = await AppDataSource.getRepository(Notification)
    .createQueryBuilder('notification')
    .where('notification.user_id = :userId', { userId })
    .orderBy('notification.createdAt', 'DESC')
    .getMany();

  return notificationList;
};
