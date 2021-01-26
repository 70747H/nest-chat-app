import {TimeStampEntity} from "../../generics/timestamp.entities";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as bcrypt from 'bcryptjs';
import {Message} from "../messages/message.entity";
import {Room} from "../rooms/room.entity";

/**
 * User entity
 */
@Entity('users')
@Unique(['username'])
export class User extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Username
   */
  @Column()
  username: string;

  /**
   * Password
   */
  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({name: 'client_id', nullable: true})
  clientId: string;

  @Column({name: 'room_id', nullable: true})
  roomId: string;

  @ManyToOne(() => Room, room => room.connectedUsers)
  @JoinColumn({name: 'room_id', referencedColumnName: 'id'})
  joinedRooms: Room;

  /**
   * Link with his messages
   */
  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
