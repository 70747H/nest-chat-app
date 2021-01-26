import {Module} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {RoomRepository} from "./room.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository]),
  ],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {
}
