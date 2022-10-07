import { Request, Response, NextFunction } from 'express';

import { UnauthorizedError } from '@errors/customErrors';
import wrapAsync from '@utils/wrapAsync';
import { jwtVerify } from '@auth/jwt';

/**
 * token을 검증 후, userId 값을 req에 담아서 넘겨주는 미들웨어 (인증 과정에서 실패 시, 오류 발생)
 */
export const checkLoggedIn = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError(
        '요청의 Authorization Header에 JWT 토큰이 포함되어 있지 않습니다.',
      );
    }

    const userId = await jwtVerify(token);
    req.userId = userId;

    next();
  },
);
