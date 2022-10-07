import AppDataSource from '@database/dataSource';
import User from '@database/entities/user';
import { ServerError } from '@errors/customErrors';

// uid db에서 유저 조회 (로그인)
export const getUserByUid = async (uid: string) => {
  const userData = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where('user.uid = :uid', { uid })
    .getOne();

  return userData;
};

// userId로 유저 조회
export const getUserById = async (userId: number) => {
  const userData = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where('user.id = :userId', { userId })
    .getOne();

  if (!userData) {
    throw new ServerError('DB에서 userData 조회를 실패하였습니다.');
  }

  return userData;
};
