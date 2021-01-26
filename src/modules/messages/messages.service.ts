import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MessageRepository} from "./message.repository";
import {Message} from "./message.entity";
import {CreateMessageDto} from "./dto/create-message.dto";
import {UpdateMessageDto} from "./dto/update-message.dto";

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(MessageRepository) private readonly messageRepository: MessageRepository) {
  }

  getMessages() {
    return this.messageRepository.find();
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageRepository.createMessage(createMessageDto);
  }

  async getMessageById(id: number): Promise<Message> {
    const found = await this.messageRepository.findOne(id);
    if (!found)
      throw new NotFoundException(`Message with ${id} not found.`);
    return found;
  }

  async deleteMessage(id: number): Promise<void> {
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Message with ${id} not found.`);
  }

  async updateMessage(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    let found = await this.getMessageById(id);
    Object.assign(found, updateMessageDto);
    return await found.save();
  }
}
