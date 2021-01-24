import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {User} from "../auth/user.entity";
import {GetUser} from "../auth/get-user.decorator";
import {MessagesService} from "./messages.service";
import {Message} from "./message.entity";
import {GetMessageFilterDto} from "./dto/get-message-filter.dto";
import {CreateMessageDto} from "./dto/create-message.dto";
import {UpdateMessageDto} from "./dto/update-message.dto";

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
  }

  @Get()
  getAllMessages(@Query() getMessageFilterDto: GetMessageFilterDto, @GetUser() user: User): Promise<Message[]> {
    return this.messagesService.getMessages(getMessageFilterDto);
  }

  @Get('/:id')
  getMessageById(@Param('id', ParseIntPipe) id: number): Promise<Message> {
    return this.messagesService.getMessageById(id);
  }

  @Post()
  // @UsePipes(ValidationPipe)
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
