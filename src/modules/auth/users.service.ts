import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {User} from "./user.entity";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({username});
  }

  async getUserByClientId(clientId: string): Promise<User> {
    return this.userRepository.findOne({clientId});
  }

  async updateUser(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    let found = await this.getUserByUsername(username);
    Object.assign(found, updateUserDto);
    return found.save();
  }
}
