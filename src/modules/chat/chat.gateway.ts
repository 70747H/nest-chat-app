import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect, WsException,
} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import {Logger, UseFilters} from '@nestjs/common';
import {UsersService} from "../auth/users.service";
import {RoomsService} from "../rooms/rooms.service";
import {MessagesService} from "../messages/messages.service";
import {WsExceptionFilter} from "../../filters/ws-exception.filter";

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({namespace: '/chat'})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly userService: UsersService, private readonly roomsService: RoomsService, private readonly messagesService: MessagesService) {
  }

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('chatToServer')
  async handleMessage(client: Socket, data: { username: string, room: string, message: string }) {
    try {
      const room = await this.roomsService.getRoomByName(data.room);
      const user = await this.userService.getUserByClientId(client.id);
      await this.messagesService.createMessage({text: data.message, roomId: room.id, userId: user.id});
      this.wss.to(room.name).emit('chatToClient', data);
      this.logger.log(`client: ${user.username} sent message in "${room.name}" room, on: ${Date.now()}`);
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  // @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client: Socket, data: { username: string, room: string, message: string }) {
    try {
      const room = await this.roomsService.getRoomByName(data.room);
      const user = await this.userService.getUserByUsername(data.username);
      if (user) {
        user.clientId = client.id;
        await this.userService.updateUser(data.username, {clientId: client.id, roomId: room.id});
        client.join(room.name);
        client.emit('joinedRoom', room.name);
        this.logger.log(`client: ${user.username} joined room: ${room.name}, on: ${Date.now()}`);
      }
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleRoomLeave(client: Socket, data: { username: string, room: string, message: string }) {
    const foundRoom = await this.roomsService.getRoomByName(data.room);
    const user = await this.userService.getUserByUsername(data.username);
    client.leave(data.room);
    client.emit('leftRoom', data.room);
    this.logger.log(`client ${user ? user.username : client.id} left room: ${foundRoom.name}, on: ${Date.now()}`);
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log(`client ${client.id} connected, on: ${Date.now()}`);
  }

  async handleDisconnect(client: Socket) {
    try {
      const user = await this.userService.getUserByClientId(client.id);
      if (user) {
        client.server.emit('users-changed', {user: user.username, event: 'left'});
        user.clientId = null;
        await this.userService.updateUser(user.username, {clientId: null, roomId: null});
      }
      this.logger.log(`client ${user ? user.username : client.id} disconnected, on: ${Date.now()}`);
    } catch (e) {
      throw new WsException(e.message);
    }
  }

}
