import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import {User} from "./user.entity";
import {JwtPayload} from "./jwt-payload-interface";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository, private readonly jwtService: JwtService){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username)
            throw new UnauthorizedException('Invalid credentials.');
        const payload  = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }

    async validateUser({ username }: JwtPayload){
        const user = await this.userRepository.findOne({ username });
        if(!user)
            throw new UnauthorizedException();
        return user;
    }
}
