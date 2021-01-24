import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {User} from "./user.entity";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository){}

    getUsers(){
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        const found = await this.userRepository.findOne(id);
        if(!found)
            throw new NotFoundException(`User with ${id} not found.`);
        return found;
    }

    async getUserByUsername(username: string): Promise<User> {
        const found = await this.userRepository.findOne({username});
        if(!found)
            throw new NotFoundException(`User with ${username} not found.`);
        return found;
    }

    async getUserByClientId(clientId: string): Promise<User> {
        const found = await this.userRepository.findOne({clientId});
        if(!found)
            throw new NotFoundException(`User with ${clientId} not found.`);
        return found;
    }

    async deleteUser(id: number): Promise<void>{
        const result = await this.userRepository.delete(id);
        if(result.affected === 0)
            throw new NotFoundException(`User with ${id} not found.`);
    }

    async updateUser(username: string, updateUserDto: UpdateUserDto): Promise<User>{
        let found = await this.getUserByUsername(username);
        Object.assign(found, updateUserDto);
        return await found.save();
    }
}
