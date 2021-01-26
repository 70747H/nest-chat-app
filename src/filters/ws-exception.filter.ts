import {Catch, Logger, NotFoundException} from '@nestjs/common';
import {BaseWsExceptionFilter, WsException} from '@nestjs/websockets';
import {QueryFailedError} from "typeorm";

@Catch(Error, NotFoundException, QueryFailedError, WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  private logger: Logger = new Logger('WsExceptionFilter');

  catch(exception, host) {
    this.logger.log(`${exception}`);
    const client = host.switchToWs().getClient();
    client.emit('exception', {
      status: 'error',
      message: exception.name
    });
  }
}
