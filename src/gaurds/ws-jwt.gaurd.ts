import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import {AuthService} from "../modules/auth/auth.service";
import {User} from "../modules/auth/user.entity";
import {JwtPayload} from "../modules/auth/jwt-payload-interface";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private logger: Logger = new Logger(WsJwtGuard.name);

  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const authHeader = client.data.headers.authorization.split('; ');
    const authToken = authHeader.substring(7, authHeader.length);
    const jwtPayload: JwtPayload = <JwtPayload> jwt.verify(authToken, 'TopSecretHighlyClassified=D');
    const user: User = await this.authService.validateUser(jwtPayload);
    context.switchToWs().getData().user = user;
    this.logger.log(`user: ${user.username} is verified.`);
    return Boolean(user);
  }
}
