/* eslint-disable import/no-cycle */
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import BasicEntity from './basic-entity';
import User from './user';
import Notification from './notification';

@Entity()
class Camera extends BasicEntity {
  @Column('varchar', { name: 'stream_key', length: 255 })
  streamKey!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  // Camera:User = N:1
  @ManyToOne(() => User, (user) => user.cameras)
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  // Camera:Notification = 1:N
  @OneToMany(() => Notification, (notification) => notification.camera)
  notifications!: Notification[];
}

export default Camera;
