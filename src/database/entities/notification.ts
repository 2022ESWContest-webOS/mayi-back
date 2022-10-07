/* eslint-disable import/no-cycle */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import BasicEntity from './basic-entity';
import User from './user';
import Camera from './camera';

export type NotiType = 'fall-down' | 'fight';

@Entity()
class Notification extends BasicEntity {
  @Column('enum', { name: 'noti_type', enum: ['fall-down', 'fight'] })
  notiType!: NotiType;

  // Notification:User = N:1
  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  // Notification:User = N:1
  @ManyToOne(() => Camera, (camera) => camera.notifications)
  @JoinColumn({
    name: 'camera_id',
  })
  camera!: Camera;
}

export default Notification;
