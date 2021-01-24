import { Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception, host) {
    super.catch(exception, host);
    // const client = host.switchToWs().getClient();
    // client.emit('exception', {
    //   status: 'error',
    //   message: exception.name
    // });
  }

}
