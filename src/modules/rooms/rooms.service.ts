import {Injectable, NotFoundException} from '@nestjs/common';
import {Room} from "./room.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RoomRepository} from "./room.repository"

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(RoomRepository) private readonly roomRepository: RoomRepository) {
  }

  getRooms() {
    return this.roomRepository.find();
  }

  async getRoomByName(name: string): Promise<Room> {
    const found = await this.roomRepository.findOne({name});
    if (!found)
      throw new NotFoundException(`Room with name: ${name} not found.`);
    return found;
  }
}
