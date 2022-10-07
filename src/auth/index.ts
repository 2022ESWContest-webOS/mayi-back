import { UnauthorizedError } from '@errors/customErrors';
import { getUserByUid } from '@database/controllers/user';
import { makeJWTToken } from './jwt';

const verify = async (uid: string, password: string) => {
  const userData = await getUserByUid(uid);

  if (!userData) {
    throw new UnauthorizedError('존재하지 않는 아이디 입니다.');
  }

  if (password !== userData.password) {
    throw new UnauthorizedError('잘못된 비밀번호 입니다.');
  }

  const { password: pwd, ...selectedData } = userData;
  const token = makeJWTToken(selectedData);

  return token;
};

export default verify;
