import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import {RoomRepository} from "./room.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
