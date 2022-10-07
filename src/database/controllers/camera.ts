import AppDataSource from '@database/dataSource';
import Camera from '@database/entities/camera';

// 카메라 목록 조회
export const getCameraList = async (userId: number) => {
  const cameraList = await AppDataSource.getRepository(Camera)
    .createQueryBuilder('camera')
    .where('camera.user_id = :userId', { userId })
    .getMany();

  return cameraList;
};
