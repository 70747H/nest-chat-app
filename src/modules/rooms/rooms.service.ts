import {Injectable, NotFoundException} from '@nestjs/common';
import {Room} from "./room.entity";
import {UpdateUserDto} from "../auth/dto/update-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import { RoomRepository } from "./room.repository"

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(RoomRepository) private readonly roomRepository: RoomRepository){}

    getRooms(){
        return this.roomRepository.find();
    }

    async getRoomById(id: number): Promise<Room> {
        const found = await this.roomRepository.findOne(id);
        if(!found)
            throw new NotFoundException(`User with ${id} not found.`);
        return found;
    }

    async getRoomByName(name: string): Promise<Room> {
        const found = await this.roomRepository.findOne({name });
        if(!found)
            throw new NotFoundException(`User with ${name} not found.`);
        return found;
    }

    async deleteRoom(id: number): Promise<void>{
        const result = await this.roomRepository.delete(id);
        if(result.affected === 0)
            throw new NotFoundException(`User with ${id} not found.`);
    }

    async updateRoom(id: number, updateUserDto: UpdateUserDto): Promise<Room>{
        let found = await this.getRoomById(id);
        Object.assign(found, updateUserDto);
        return await found.save();
    }
}
