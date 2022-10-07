import UserEntity from '@database/entities/user';

declare global {
  namespace Express {
    interface User extends UserEntity {}
    interface Request {
      userId?: number;
    }
  }
}
