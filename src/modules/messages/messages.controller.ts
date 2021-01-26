import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {User} from "../auth/user.entity";
import {GetUser} from "../auth/get-user.decorator";
import {MessagesService} from "./messages.service";
import {Message} from "./message.entity";
import {CreateMessageDto} from "./dto/create-message.dto";
import {UpdateMessageDto} from "./dto/update-message.dto";
import {AuthGuard} from "@nestjs/passport";

@UseGuards(AuthGuard())
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
  }

  @Get()
  getAllMessages(@GetUser() user: User): Promise<Message[]> {
    return this.messagesService.getMessages();
  }

  @Get('/:id')
  getMessageById(@Param('id', ParseIntPipe) id: number): Promise<Message> {
    return this.messagesService.getMessageById(id);
  }

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto, @GetUser() user: User): Promise<Message> {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Delete('/:id')
  deleteMessage(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.messagesService.deleteMessage(id);
  }

  @Patch('/:id')
  updateMessage(@Param('id', ParseIntPipe) id: number, @Body() updateMessageDto: UpdateMessageDto): Promise<Message> {
    return this.messagesService.updateMessage(id, updateMessageDto);
  }
}
