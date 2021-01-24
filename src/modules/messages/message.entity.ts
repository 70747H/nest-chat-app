import { TimeStampEntity } from "../../generics/timestamp.entities";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {User} from "../auth/user.entity";
import {Room} from "../rooms/room.entity";

@Entity('messages')
export class Message extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'room_id' })
    roomId: number;

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Room, room => room.messages)
    @JoinColumn({name: 'room_id', referencedColumnName: 'id' })
    room: Room;

}
