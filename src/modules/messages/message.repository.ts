import {EntityRepository, Repository} from "typeorm";
import {Message} from "./message.entity";
import {CreateMessageDto} from "./dto/create-message.dto";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message>{
    async createMessage({ text, roomId, userId }: CreateMessageDto): Promise<Message>{
        const message = new Message();
        message.text = text;
        message.roomId = roomId;
        message.userId = userId;
        await message.save();

        delete message.user;
        delete message.room;
        return message;
    }
}
