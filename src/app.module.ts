import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/config';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import { ChatGateway } from './modules/chat/chat.gateway';
import {ChatModule} from "./modules/chat/chat.module";
import { MessagesModule } from './modules/messages/messages.module';
import { RoomsModule } from './modules/rooms/rooms.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [config],
      envFilePath: !ENV ? './env/.env' : `./env/.${ENV}.env`,
    }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log('aaaaaaaaaaaaaaaa: ', config.get('database'))
        return config.get('database');
      },
      inject: [ConfigService]
    }),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client'),
    }),
    ChatModule,
    MessagesModule,
    RoomsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
