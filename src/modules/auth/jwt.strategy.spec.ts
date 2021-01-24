import {JwtStrategy} from "./jwt.strategy";
import {Test} from "@nestjs/testing";
import {JwtService} from "@nestjs/jwt";
import {UserRepository} from "./user.repository";
import {User} from "./user.entity";
import {reduce} from "rxjs/operators";
import {UnauthorizedException} from "@nestjs/common";

const mockUserRepository = ()=>({
    findOne: jest.fn()
});

describe('JwtStrategy', ()=>{
    let jwtStrategy: JwtStrategy;
    let userRepository;

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                { provide: UserRepository, useFactory: mockUserRepository }
            ],
        }).compile();

        jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
        userRepository = await module.get<UserRepository>(UserRepository);
    });

    describe('validate', ()=>{
        it('validates and returns the user based on the JWT payload', async()=> {
            const user = new User();
            user.username = 'testUser';
            userRepository.findOne.mockResolvedValue(user);
            const result = await jwtStrategy.validate({ userId: 'testUser' });
            expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testUser' });
            expect(result).toEqual(user);
        });
        it('throws unauthorized exception as user cannot be found', ()=> {
            userRepository.findOne.mockResolvedValue(null);
            expect(jwtStrategy.validate({ userId: 'testUser' })).rejects.toThrow(UnauthorizedException);
        });
    });
});
