/* eslint-disable import/no-cycle */
import { Entity, Column, OneToMany } from 'typeorm';

import BasicEntity from './basic-entity';
import Camera from './camera';
import Notification from './notification';

@Entity()
class User extends BasicEntity {
  @Column('varchar', { length: 255 })
  uid!: string;

  @Column('varchar', { length: 255 })
  password!: string;

  // User:Camera = 1:N
  @OneToMany(() => Camera, (camera) => camera.user)
  cameras!: Camera[];

  // User:Notification = 1:N
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];
}

export default User;
