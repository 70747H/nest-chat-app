import {TimeStampEntity} from "../../generics/timestamp.entities";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Message} from "../messages/message.entity";
import {User} from "../auth/user.entity";

@Entity('rooms')
@Unique(['name'])
export class Room extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Message, message => message.room)
  messages: Message[];

  @OneToMany(() => User, user => user.joinedRooms)
  connectedUsers: User[];
}
